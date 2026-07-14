import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE, type SessionPayload } from "@/lib/auth/session";
import { isRoleAllowed, matchRouteGroup, homeForRole } from "@/lib/auth/rbac";

export const config = {
  matcher: ["/citizen/:path*", "/officer/:path*", "/admin/:path*"],
};

async function readSession(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.AUTH_SECRET)
    );
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!matchRouteGroup(pathname)) {
    return NextResponse.next();
  }

  const session = await readSession(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isRoleAllowed(pathname, session.role)) {
    return NextResponse.redirect(new URL(homeForRole(session.role), request.url));
  }

  return NextResponse.next();
}
