"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/Authcontext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/login");
    } else if (
      isLoggedIn &&
      localStorage.getItem("has_active_plan") !== "true"
    ) {
      router.push("/abonnement");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null) {
    return null; // or show a loading spinner
    // return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
