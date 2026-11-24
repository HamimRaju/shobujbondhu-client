import { NextResponse, type NextRequest } from "next/server";
import { validateAuthSession } from "@/lib/auth-session-validation";

function getReturnTo(request: NextRequest) {
  const query = new URLSearchParams(request.nextUrl.searchParams);
  query.delete("_rsc");
  const suffix = query.size ? `?${query.toString()}` : "";
  return `${request.nextUrl.pathname}${suffix}`;
}

export async function proxy(request: NextRequest) {
  const session = await validateAuthSession(
    request.headers.get("cookie") ?? "",
  );
  if (session) return NextResponse.next();

  const loginURL = new URL("/login", request.url);
  loginURL.searchParams.set("callbackURL", getReturnTo(request));
  return NextResponse.redirect(loginURL);
}

export const config = {
  matcher: [
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
    "/profile/:path*",
  ],
};
