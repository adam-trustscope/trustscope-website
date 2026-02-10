import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Stealth mode configuration
const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN || "ts-preview-2026-secret";
const PREVIEW_COOKIE = "ts_preview_access";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check for preview token in URL
  const previewParam = searchParams.get("preview");
  if (previewParam === PREVIEW_TOKEN) {
    // Set cookie and redirect to clean URL (remove query param)
    const cleanUrl = new URL(pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(PREVIEW_COOKIE, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  // Check for existing preview cookie
  const hasPreviewAccess = request.cookies.get(PREVIEW_COOKIE)?.value === "true";

  // If has preview access, allow all routes
  if (hasPreviewAccess) {
    return NextResponse.next();
  }

  // STEALTH MODE: Only allow landing page and waitlist API
  const allowedPaths = ["/", "/api/waitlist"];

  if (!allowedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
