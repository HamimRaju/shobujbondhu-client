"use client";

import { Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

/** UI only: no request is made and nothing is stored. */
export function NewsletterForm() {
  const inputId = useId();
  const statusId = useId();
  const noteId = useId();
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    setMessage(
      "Thanks for your interest. Newsletter sign-up isn\u2019t live yet, so your email wasn\u2019t saved.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor={inputId} className="block text-sm font-semibold">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-describedby={`${statusId} ${noteId}`}
          className="h-12 w-full min-w-0 flex-1 rounded-full border border-border bg-background px-5 text-base text-foreground placeholder:text-muted/70 transition-shadow focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        />
        <Button type="submit" size="lg" className="sm:shrink-0">
          Subscribe
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </div>
      <p id={noteId} className="mt-3 text-xs leading-5 text-muted">
        This sign-up isn&rsquo;t live yet. Your email won&rsquo;t be stored.
      </p>
      <p id={statusId} role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-muted">
        {message}
      </p>
    </form>
  );
}
