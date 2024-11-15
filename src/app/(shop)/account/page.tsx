import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getSession();

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-medium mb-4">My Account</h1>
      <div className="flex gap-4 items-center bg-gray-50 rounded justify-between">
        <p className="text-gray-900 text-md p-4">
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
          <Link href="/logout" className={buttonVariants()}>
            Logout
          </Link>
        ) : (
          <Link href="/login" className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
