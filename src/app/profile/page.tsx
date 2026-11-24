import type { Metadata } from "next";
import { ProfilePageContent } from "@/components/auth/profile-page-content";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";
import { ProtectedRoute } from "@/components/auth/protected-route";

export const metadata: Metadata = {
  title: "Your profile",
  description: "View your ShobujBondhu community account.",
};

export default function ProfilePage() {
  return (
    <ProtectedRoute
      returnTo="/profile"
      fallback={<ProtectedPageSkeleton variant="profile" />}
    >
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
