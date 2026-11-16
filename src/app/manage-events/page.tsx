import type { Metadata } from "next";
import { Suspense } from "react";
import { ManageEventsDashboard } from "@/components/events/manage-events-dashboard";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";
import { requireAuthenticatedSession } from "@/lib/auth-session-server";

export const metadata: Metadata = {
  title: "Manage events",
  description:
    "Review and manage the community events you have created with ShobujBondhu.",
};

export default function ManageEventsPage() {
  return (
    <Suspense
      fallback={<ProtectedPageSkeleton variant="manage-events" />}
    >
      <ProtectedManageEventsPage />
    </Suspense>
  );
}

async function ProtectedManageEventsPage() {
  await requireAuthenticatedSession("/manage-events");
  return <ManageEventsDashboard />;
}
