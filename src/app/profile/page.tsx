import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfilePageContent } from "@/components/auth/profile-page-content";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";
import { requireAuthenticatedSession } from "@/lib/auth-session-server";

export const metadata: Metadata = {
  title: "Your profile",
  description: "View your ShobujBondhu community account.",
};

export default function ProfilePage() {
  return (
    <Suspense
      fallback={<ProtectedPageSkeleton variant="profile" />}
    >
      <ProtectedProfilePage />
    </Suspense>
  );
}

async function ProtectedProfilePage() {
  await requireAuthenticatedSession("/profile");
  return <ProfilePageContent />;
}
