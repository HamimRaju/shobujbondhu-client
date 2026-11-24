"use client";

import { useAuthSession } from "@/components/providers/auth-session-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CreateEventForm } from "@/components/events/create-event-form";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";

function AuthenticatedCreateEventForm() {
  const { user } = useAuthSession();
  if (!user) return null;

  return (
    <CreateEventForm
      creatorName={user.name}
      creatorEmail={user.email}
    />
  );
}

export function CreateEventPageContent() {
  return (
    <ProtectedRoute
      returnTo="/create-event"
      fallback={<ProtectedPageSkeleton variant="create-event" />}
    >
      <AuthenticatedCreateEventForm />
    </ProtectedRoute>
  );
}
