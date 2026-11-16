import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPageContent } from "@/components/auth/login-page-content";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to find local events and take part in community action with ShobujBondhu.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm font-medium text-muted" role="status">
          Loading sign in…
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
