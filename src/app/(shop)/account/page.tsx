import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

function Card({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="bg-gray-50 p-4 hover:bg-gray-100 flex">
      <div className="flex-1 flex flex-col ml-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">{description}</p>
      </div>
    </Link>
  );
}

export default async function AccountPage() {
  const session = await getSession();

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-medium mb-4">My Account</h1>
      <div className="flex gap-4 items-center">
        <p className="text-gray-900 text-md">
          {session.user ? (
            <span>
              You are currently logged in as{" "}
              <span className="font-semibold">{session.user?.email}</span>.
            </span>
          ) : (
            <span>You are not logged in.</span>
          )}
        </p>
        {session.user ? (
          <Link href="/logout" className={buttonVariants({ size: "sm" })}>
            Logout
          </Link>
        ) : (
          <Link href="/login" className={buttonVariants({ size: "sm" })}>
            Login
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card
          title="My Orders"
          description="View your order history"
          href="/orders"
        />
        <Card
          title="Update information"
          description="Update your account information"
          href="/account/update"
        />
        <Card
          title="Contact Support"
          description="Get help with your account or orders"
          href="/support"
        />
      </div>
    </div>
  );
}
