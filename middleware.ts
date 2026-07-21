import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("app-auth");

  if (auth?.value === "authenticated") {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("/login", req.url)
  );
}

export const config = {
  matcher: [
    "/((?!login|api|_next|favicon.ico).*)",
  ],
};