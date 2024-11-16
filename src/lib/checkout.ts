"use server";

import { db } from "@/db";
import { orderItemsTable, ordersTable } from "@/db/schema";
import {
  ApiError,
  AppSession,
  CaptureOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/types";
import {
  ApiResponse,
  CheckoutPaymentIntent,
  Client,
  Environment,
  Order,
  OrdersController,
  PhoneType,
} from "@paypal/paypal-server-sdk";
import { eq } from "drizzle-orm";
import { parsePhoneNumber } from "libphonenumber-js/min";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID!,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET!,
  },
  timeout: 0,
  environment: Environment.Sandbox,
});

const ordersController = new OrdersController(client);

export async function createOrder(
  session: AppSession,
  input: CreateOrderRequest,
): Promise<CreateOrderResponse | ApiError> {
  const { guest_email, ...shippingInformation } = input;

  if (!session.user && !guest_email) {
    return {
      error: "Guest email is required if user is not logged in",
    };
  }

  const total_price = session.cart.items.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  let paypalApiResponse: ApiResponse<Order>;

  try {
    paypalApiResponse = await ordersController.ordersCreate({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: session.cart.items.map((item) => ({
          amount: {
            currencyCode: "USD",
            value: (Number(item.product.price) * item.quantity).toFixed(2),
          },
          description: item.product.name,
          quantity: item.quantity.toString(),
          referenceId: item.product.id,
        })),
        payer: {
          name: {
            givenName: input.shipping_first_name,
            surname: input.shipping_last_name,
          },
          emailAddress: session.user?.email || guest_email,
          address: {
            addressLine1: input.shipping_address,
            adminArea2: input.shipping_city,
            countryCode: input.shipping_country_code,
          },
          phone: {
            phoneType: PhoneType.Mobile,
            phoneNumber: {
              nationalNumber: parsePhoneNumber(input.shipping_phone_number)
                .nationalNumber,
            },
          },
        },
      },
      prefer: "return=minimal",
    });
  } catch (error) {
    console.error("PayPal API error", error);
    const err = error as any;
    if (err.body) {
      const body = JSON.parse(err.body.toString());
      return {
        error: `PayPal API error: ${body.message}`,
      };
    } else if (err.statusCode) {
      return {
        error: `PayPal API error: Received status code ${err.statusCode}`,
      };
    } else {
      return {
        error: "PayPal API error: Unknown error",
      };
    }
  }

  const { body, ...httpResponse } = paypalApiResponse;

  const paypalOrderId = httpResponse.result.id;
  if (!paypalOrderId) {
    throw new Error("PayPal order ID not found in response");
  }

  await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(ordersTable)
      .values({
        paypal_id: paypalOrderId,
        user_id: session.user?.id,
        ...shippingInformation,
        total_price: total_price.toFixed(2),
        guest_email,
        // awaiting payment
        status: "pending",
      })
      .returning();
    await tx.insert(orderItemsTable).values(
      session.cart.items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: (Number(item.product.price) * item.quantity).toFixed(2),
      })),
    );
  });

  return {
    jsonResponse: JSON.parse(body.toString()),
    httpStatusCode: httpResponse.statusCode,
  };
}

export async function captureOrder(
  orderId: string,
): Promise<CaptureOrderResponse> {
  const { body, ...httpResponse } = await ordersController.ordersCapture({
    id: orderId,
    prefer: "return=minimal",
  });

  const paypalOrderId = httpResponse.result.id;
  if (!paypalOrderId) {
    throw new Error("PayPal order ID not found in response");
  }

  const updatedOrders = await db
    .update(ordersTable)
    .set({
      status: "processing",
    })
    .where(eq(ordersTable.paypal_id, paypalOrderId))
    .returning();

  return {
    order: updatedOrders[0],
    jsonResponse: JSON.parse(body.toString()),
    httpStatusCode: httpResponse.statusCode,
  };
}
