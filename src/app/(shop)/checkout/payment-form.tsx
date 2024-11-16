import { Order } from "@/types";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { RefObject, useState } from "react";

export function PaymentForm({
  formRef,
  onCompleted,
}: {
  formRef: RefObject<HTMLFormElement | null>;
  onCompleted: (order: Order) => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const paypalCreateOrder = async () => {
    if (!formRef.current) {
      return null;
    }
    try {
      const formData = new FormData(formRef.current);
      const res = await fetch("/checkout/create-order", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json.error) {
        throw new Error(json.error);
      }

      const orderData = json;
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage((error as Error).message);
      return null;
    }
  };

  const paypalOnApprove = async (data: any, actions: any) => {
    try {
      const res = await fetch("/checkout/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      const json = await res.json();

      const paypalOrderData = json.jsonResponse;
      const order = json.order as Order;

      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = paypalOrderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(
          `${errorDetail.description} (${paypalOrderData.debug_id})`,
        );
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');

        const transaction =
          paypalOrderData.purchase_units[0].payments.captures[0];

        onCompleted(order);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium">Payment</h2>
      <PayPalButtons
        style={{
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        }}
        createOrder={paypalCreateOrder}
        onApprove={paypalOnApprove}
      />
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
