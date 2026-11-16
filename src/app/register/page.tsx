import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterPageContent } from "@/components/auth/register-page-content";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create a ShobujBondhu account and connect with local volunteering opportunities.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm font-medium text-muted" role="status">
          Loading registration…
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
