import type { Metadata } from "next";
import { ManageEventsDashboard } from "@/components/events/manage-events-dashboard";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";

export const metadata: Metadata = {
  title: "Manage events",
  description:
    "Review and manage the community events you have created with ShobujBondhu.",
};

export default function ManageEventsPage() {
  return (
    <ProtectedRoute
      returnTo="/manage-events"
      fallback={<ProtectedPageSkeleton variant="manage-events" />}
    >
      <ManageEventsDashboard />
    </ProtectedRoute>
  );
}
