import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("app-auth");

  if (req.cookies.get("app-auth")?.value === process.env.APP_AUTH_SECRET)
    return NextResponse.next();

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/((?!login|api|_next|favicon.ico).*)",
  ],
};