import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * This is a static portfolio with NO Server Actions. Internet bots POST bogus
 * `Next-Action` headers to the exposed port; Next.js 16 then throws an
 * uncaught "Failed to find Server Action" error that crashes the whole server.
 * Reject those requests here at the edge (proxy runs before route handling),
 * so the process stays up. Everything else passes through untouched.
 */
export function proxy(request: NextRequest) {
  if (request.method === "POST" && request.headers.has("next-action")) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
