"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/Authcontext";

const PublicOnlyRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === true && localStorage.getItem("form_filled") === "true") {
      router.replace("/");
    } else if (
      isLoggedIn === true &&
      localStorage.getItem("form_filled") === "false"
    ) {
      router.replace("/onboarding");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === true) {
    return null;
  }

  return children;
};

export default PublicOnlyRoute;
