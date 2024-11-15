import { clearSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET() {
  await clearSession();

  redirect("/login");
}
