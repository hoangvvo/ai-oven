import { getSession } from "@/lib/session";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { CartModal } from "../cart";
import { Logo } from "../logo";
import { buttonVariants } from "../ui/button";
import Search, { SearchSkeleton } from "./search";
import { SignInButton } from "./sign-in-button";

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
    path: "#",
  },
];

function MobileMenu() {
  return (
    <>
      <button
        aria-label="Open mobile menu"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>
    </>
  );
}

export async function Navbar() {
  const session = await getSession();

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 border-b border-gray-200">
      <div className="flex gap-4 md:gap-8 w-full md:w-1/3 items-center">
        <MobileMenu />
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
          <SignInButton />
        )}
        <CartModal />
      </div>
    </nav>
  );
}
