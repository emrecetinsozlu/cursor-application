import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;
  const isHomePage = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  if (!userId && isDashboard) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (userId && isHomePage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
