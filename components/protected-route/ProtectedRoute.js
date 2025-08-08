"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/Authcontext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  if (isLoggedIn === null) {
    return null; // or show a loading spinner
    // return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
