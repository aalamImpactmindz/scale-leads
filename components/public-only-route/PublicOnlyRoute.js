"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/Authcontext";

const PublicOnlyRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === true) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null || isLoggedIn === true) {
    return null;
  }

  return children;
};

export default PublicOnlyRoute;
