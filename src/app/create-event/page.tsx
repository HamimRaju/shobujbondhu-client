import type { Metadata } from "next";
import { Suspense } from "react";
import { CreateEventForm } from "@/components/events/create-event-form";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";
import { requireAuthenticatedSession } from "@/lib/auth-session-server";

export const metadata: Metadata = {
  title: "Create an event",
  description:
    "Bring your community together by creating a local ShobujBondhu event.",
};

export default function CreateEventPage() {
  return (
    <Suspense
      fallback={<ProtectedPageSkeleton variant="create-event" />}
    >
      <ProtectedCreateEventPage />
    </Suspense>
  );
}

async function ProtectedCreateEventPage() {
  const session = await requireAuthenticatedSession("/create-event");

  return (
    <CreateEventForm
      creatorName={session.user.name}
      creatorEmail={session.user.email}
    />
  );
}
