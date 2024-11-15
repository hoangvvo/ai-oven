"use server";

import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await getSession();

  if (session.user) {
    redirect("/account");
  }

  return (
    <div className="container max-w-2xl mx-auto py-24">
      <h1 className="text-3xl font-medium mb-4">Login</h1>
      <p className="text-gray-500 mb-8">
        Login to your account to access your orders and prefill your details
        while shopping.
      </p>
      <LoginForm />
      <p className="text-gray-500 mt-8">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline text-gray-700">
          Register
        </Link>
      </p>
    </div>
  );
}
