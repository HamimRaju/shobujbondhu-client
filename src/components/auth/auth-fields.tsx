"use client";

import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState } from "react";

const inputClassName =
  "h-12 w-full rounded-xl border border-border bg-background/70 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 hover:border-border focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/10 dark:aria-[invalid=true]:border-red-400";

type AuthTextFieldProps = {
  id: string;
  label: string;
  type: "email" | "text" | "url";
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  placeholder: string;
  error?: string;
  required?: boolean;
};

export function AuthTextField({
  id,
  label,
  type,
  icon: Icon,
  value,
  onChange,
  autoComplete,
  placeholder,
  error,
  required = true,
}: AuthTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-foreground"
      >
        {label}
        {!required ? (
          <span className="ml-1.5 text-xs font-medium text-muted">Optional</span>
        ) : null}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
        />
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  error?: string;
  hint?: string;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  error,
  hint,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-[1.125rem]"
            fill="none"
          >
            <rect
              x="4"
              y="10"
              width="16"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M8 10V7a4 4 0 0 1 8 0v3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder="Enter your password"
          required
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${inputClassName} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-offset-1"
        >
          {visible ? (
            <EyeOff className="size-[1.125rem]" aria-hidden="true" />
          ) : (
            <Eye className="size-[1.125rem]" aria-hidden="true" />
          )}
        </button>
      </div>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs leading-5 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
