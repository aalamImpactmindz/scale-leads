"use client";

import { useEffect } from "react";

const AuthChecker = () => {
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expires_at");

    if (authToken && expiresAt) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > expiresAt) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("expires_at");
        window.location.href = "/login";
      }
    }
  }, []);

  return null;
};

export default AuthChecker;
