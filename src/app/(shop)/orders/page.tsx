import { getOrdersByUserId } from "@/lib/data";
import { getSession } from "@/lib/session";
import { Order } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const getDescription = (order: Order) => {
  // "Item 1, Item 2, and Item 3" or "Item 1, Item 2, Item 3, and 2 more"
  const firstThreeOrderItems = order.orderItems?.slice(0, 3);
  const remainingOrderItems = order.orderItems?.slice(3);

  const firstThreeItems = firstThreeOrderItems
    ?.map((item) => item.product?.name)
    .join(", ");
  const remainingItems = remainingOrderItems?.length
    ? `and ${remainingOrderItems.length} more`
    : "";

  return `${firstThreeItems} ${remainingItems}`;
};

function OrderCard({ order }: { order: Order }) {
  const firstOrderItem = order.orderItems?.[0];

  return (
    <div className="bg-gray-50 p-4 border-l-4 border-indigo-500 hover:bg-gray-100 flex">
      {firstOrderItem?.product?.image_urls[0] && (
        <Image
          src={firstOrderItem.product.image_urls[0]}
          alt={firstOrderItem.product.name}
          width={96}
          height={96}
          className="w-24 h-24 object-cover rounded"
        />
      )}
      <div className="flex-1 flex flex-col ml-4">
        <h2 className="text-lg font-medium">Order #{order.id}</h2>
        <p className="text-gray-700 text-sm mb-2">
          {format(new Date(order.created_at), "MMMM d, yyyy h:mm a")}
        </p>
        <p className="text-gray-700 text-sm mb-2">{getDescription(order)}</p>
      </div>
    </div>
  );
}

export default async function OrdersPage() {
  const session = await getSession();
  if (!session.user) {
    redirect("/login");
  }

  const orders = await getOrdersByUserId(session.user.id);

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-medium mb-4">My Orders</h1>
      {!orders.length && (
        <p className="text-lg text-gray-700">
          You haven't placed any orders yet.
        </p>
      )}
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <OrderCard order={order} />
          </Link>
        ))}
      </div>
    </div>
  );
}
