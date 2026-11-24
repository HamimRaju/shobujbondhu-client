"use client";

import Image from "next/image";
import { useState } from "react";

export type AvatarUser = {
  name: string;
  image?: string | null;
};

function isImageURL(value: string | null | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function AuthAvatar({
  user,
  size = "md",
}: {
  user: AvatarUser;
  size?: "sm" | "md" | "lg";
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const sizeClass = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-20 text-2xl",
  }[size];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-sage font-bold text-brand-forest ring-1 ring-inset ring-brand-forest/10 dark:bg-brand-amber/15 dark:text-brand-amber dark:ring-brand-amber/20 ${sizeClass}`}
    >
      {isImageURL(user.image) && !imageFailed ? (
        <Image
          src={user.image!}
          alt=""
          width={80}
          height={80}
          unoptimized
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        user.name.trim().charAt(0).toUpperCase() || "?"
      )}
    </span>
  );
}
