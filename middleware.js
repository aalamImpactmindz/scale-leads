import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const onboardingFormFilled =
    request.cookies.get("onboarding_form_filled")?.value === "true";
  const messagesFilled =
    request.cookies.get("messages_filled")?.value === "true";
  const hasActivePlan =
    request.cookies.get("has_active_plan")?.value === "true";
  const { pathname } = request.nextUrl;

  const res = NextResponse.next();

  // Redirect logged-in users away from auth pages
  if (
    token &&
    (pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/reset-password")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (
    !token &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/onboarding") ||
      pathname.startsWith("/messages"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect if user lacks active plan
  if (
    token &&
    pathname.startsWith("/dashboard") &&
    (hasActivePlan === false || hasActivePlan === "false")
  ) {
    return NextResponse.redirect(new URL("/abonnement", request.url));
  }

  // Redirect based on onboarding and messages filled status
  if (
    token &&
    onboardingFormFilled &&
    (messagesFilled === false || messagesFilled === "false") &&
    pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/messages", request.url));
  }

  if (
    token &&
    onboardingFormFilled &&
    messagesFilled &&
    (hasActivePlan === false || hasActivePlan === "false") &&
    (pathname.startsWith("/onboarding") || pathname.startsWith("/messages"))
  ) {
    return NextResponse.redirect(new URL("/abonnement", request.url));
  }

  if (
    token &&
    (onboardingFormFilled === false || onboardingFormFilled === "false") &&
    pathname.startsWith("/messages")
  ) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  if (
    token &&
    onboardingFormFilled &&
    messagesFilled &&
    hasActivePlan &&
    (pathname.startsWith("/onboarding") || pathname.startsWith("/messages"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding",
    "/messages",
    "/login",
    "/register",
    "/reset-password",
  ],
};
