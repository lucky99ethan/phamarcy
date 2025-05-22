import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Check if the pathname starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // If no token, redirect to login
    if (!token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }

    // Check role-based access
    const userRole = token.role as string

    // If trying to access admin-only routes
    if (pathname.startsWith("/dashboard/users") || pathname.startsWith("/dashboard/reports")) {
      if (userRole !== "admin") {
        // Redirect to dashboard home if not admin
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    // If trying to access doctor/admin routes
    if (pathname.startsWith("/dashboard/inventory")) {
      if (userRole !== "admin" && userRole !== "doctor") {
        // Redirect to dashboard home if not admin or doctor
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
}
