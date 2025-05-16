import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const formFilled = request.cookies.get("form_filled")?.value === "true";
  const messagesFilled =
    request.cookies.get("messages_filled")?.value === "true";
  const hasActivePlanCookie =
    request.cookies.get("has_active_plan")?.value === "true";
  const { pathname } = request.nextUrl;

  const res = NextResponse.next();

  // Fetch onboarding & messages status
  try {
    const statusResponse = await fetch(
      "https://impactmindz.in/client/scaleleads/api/status",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const statusData = await statusResponse.json();
    const { on_boarding_form, messages } = statusData;

    // Redirect based on onboarding/messages status
    if (on_boarding_form === true && messages === true) {
      if (pathname === "/onboarding" || pathname === "/messages") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else if (on_boarding_form === true && messages === false) {
      if (pathname === "/onboarding") {
        return NextResponse.redirect(new URL("/messages", request.url));
      }
    } else if (on_boarding_form === false && messages === false) {
      if (pathname === "/messages") {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  } catch (err) {
    console.error("Error checking onboarding/messages:", err);
  }

  // Fetch user's plan
  let hasActivePlan = hasActivePlanCookie;
  if (token && !hasActivePlanCookie) {
    try {
      const planResponse = await fetch(
        "https://impactmindz.in/client/scaleleads/api/user/plan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      const planData = await planResponse.json();
      const plan = planData.plan;

      if (plan?.status === "active") {
        hasActivePlan = true;
        res.cookies.set("has_active_plan", "true", {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
      }
      console.log("Hello there!");
    } catch (error) {
      console.error("Failed to fetch user's plan:", error);
    }
  }

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
  if (token && pathname.startsWith("/dashboard") && !hasActivePlan) {
    return NextResponse.redirect(new URL("/abonnement", request.url));
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
