"use client";
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially set to null

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expires_at");

    if (authToken && expiresAt) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresAtNumber = Number(expiresAt);

      if (currentTime < expiresAtNumber) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // Token expired
      }
    } else {
      setIsLoggedIn(false); // No token found, user is not logged in
    }
  }, []);

  // Optional: Clear localStorage if logged out
  useEffect(() => {
    if (isLoggedIn === false) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("expires_at");
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
