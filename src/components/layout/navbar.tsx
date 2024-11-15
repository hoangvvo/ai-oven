import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "../logo";
import { Button } from "../ui/button";
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

export function Navbar() {
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
        <Button>Sign in</Button>
        <Button variant="secondary">
          <ShoppingCartIcon className="w-4 h-4" />
          My cart
        </Button>
      </div>
    </nav>
  );
}
