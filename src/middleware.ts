import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodedToken } from "./utils/decodedToken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;;

  // Check if token is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user  = decodedToken(token);

  const isAdminPath = request.nextUrl.pathname.startsWith("/dashboard");

    // Redirect if user is not authorized
    if (isAdminPath && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }


  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:[ "/shop/:medicineId", "/dashboard",]
};
