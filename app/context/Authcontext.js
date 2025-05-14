"use client";
import React, { createContext, useState, useEffect, useRef } from "react";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const hasReloaded = useRef(false); // ensure reload happens only once

  // Initial login check
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expires_at");

    if (authToken && expiresAt) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresAtNumber = Number(expiresAt);

      if (currentTime < expiresAtNumber) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Clear localStorage if logged out
  useEffect(() => {
    if (isLoggedIn === false) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("form_filled");
    }
  }, [isLoggedIn]);

  // Monitor token expiry every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const expiresAt = localStorage.getItem("expires_at");
      if (!expiresAt) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const expiresAtNumber = Number(expiresAt);

      if (currentTime >= expiresAtNumber && !hasReloaded.current) {
        hasReloaded.current = true; // prevent multiple reloads
        setIsLoggedIn(false); // update state to trigger cleanup
        window.location.reload(); // reload the page
      }
    }, 2000);

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
