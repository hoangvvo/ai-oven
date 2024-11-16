import { getSession } from "@/lib/session";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "./register-form";

export default async function CreateAccountPage() {
  const session = await getSession();

  if (session.user) {
    redirect("/account");
  }

  return (
    <div className="container max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-medium mb-4">Create Account</h1>
      <p className="text-gray-500 mb-8">
        Create an account and enjoy the world of gourmet food and drinks with
        us.
      </p>
      <RegisterForm />
      <p className="text-gray-500 mt-8">
        Already have an account?{" "}
        <Link href="/login" className="underline text-gray-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Create Account - AI Oven",
  description:
    "Create an account and enjoy the world of gourmet food and drinks with us.",
};
