"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--surface)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
        },
      }}
    />
  );
}
