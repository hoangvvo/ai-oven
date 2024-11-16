import { getSession } from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { CartModal } from "../cart";
import { Logo } from "../logo";
import { buttonVariants } from "../ui/button";
import Search, { SearchSkeleton } from "./search";

const menu = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Menu",
    path: "/products",
  },
  {
    title: "About",
    path: "/about",
  },
];

export async function Navbar() {
  const session = await getSession();

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 border-b border-gray-200">
      <div className="flex gap-8 w-full md:w-1/3">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="hidden gap-6 text-md md:flex md:items-center">
          {menu.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className="text-neutral-600 underline-offset-4 hover:text-black hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden justify-center md:flex md:w-1/3">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div>
      <div className="flex gap-2 justify-end md:w-1/3">
        {session.user ? (
          <Link
            href="/account"
            className={buttonVariants()}
            aria-label="My Account"
          >
            <UserIcon className="h-4 w-4" />
            <span className="hidden md:block">My Account</span>
          </Link>
        ) : (
          <Link href="/login" className={buttonVariants()} aria-label="Sign In">
            Sign In
          </Link>
        )}
        <CartModal />
      </div>
    </nav>
  );
}
