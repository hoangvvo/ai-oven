import { captureOrder } from "@/lib/checkout";

export async function POST(request: Request) {
  const orderId = (await request.json()).orderID;
  const res = await captureOrder(orderId);

  return Response.json(res, {
    status: res.httpStatusCode,
  });
}
