"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

export function SignInButton() {
  const pathname = usePathname();
  return (
    <Link
      href={`/login?next=${encodeURIComponent(pathname)}`}
      className={buttonVariants()}
      aria-label="Sign In"
    >
      <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
      <span className="hidden md:block">Sign in</span>
    </Link>
  );
}
