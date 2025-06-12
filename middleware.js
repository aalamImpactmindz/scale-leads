import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request) {
  const gtoken = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const mstoken = request.cookies.get("microsoft_access_token")?.value;
  const token = request.cookies.get("authToken")?.value ||gtoken || mstoken ;
  const onboardingFormFilled = request.cookies.get(
    "onboarding_form_filled"
  )?.value;
  const messagesFilled = request.cookies.get("messages_filled")?.value;
  const hasActivePlan = request.cookies.get("has_active_plan")?.value;
  // const canAccessProtectedPages = request.cookies.get(
  //   "can_access_protected_pages"
  // )?.value;

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
    (onboardingFormFilled === true || onboardingFormFilled === "true") &&
    (messagesFilled === false || messagesFilled === "false") &&
    pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/messages", request.url));
  }

  if (
    token &&
    (onboardingFormFilled === true || onboardingFormFilled === "true") &&
    (messagesFilled === true || messagesFilled === "true") &&
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
    (onboardingFormFilled === true || onboardingFormFilled === "true") &&
    (messagesFilled === true || messagesFilled === "true") &&
    (hasActivePlan === true || hasActivePlan === "true") &&
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
    "/success",
    "/cancel",
  ],
};
