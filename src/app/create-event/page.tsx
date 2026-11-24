import type { Metadata } from "next";
import { CreateEventPageContent } from "@/components/events/create-event-page-content";

export const metadata: Metadata = {
  title: "Create an event",
  description:
    "Bring your community together by creating a local ShobujBondhu event.",
};

export default function CreateEventPage() {
  return <CreateEventPageContent />;
}
