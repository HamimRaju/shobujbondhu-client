"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RetryEventsButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => router.refresh()}
      className="mt-6"
    >
      <RefreshCw className="size-4" aria-hidden="true" />
      Try again
    </Button>
  );
}
