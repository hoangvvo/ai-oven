import PrivacyPolicy from "@/markdown/privacy-policy.mdx";
import { Metadata } from "next";

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}

export const metadata: Metadata = {
  title: "Privacy Policy - AI Oven",
};
