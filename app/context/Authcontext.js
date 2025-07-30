"use client";
import React, { createContext, useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[smtp,setsmtp] = useState(false);
  const [user,setuser] = useState();
  const [connected,setconnected] = useState(false);
  const[email,setemailconnected] = useState(false);
  const hasReloaded = useRef(false); // ensure reload happens only once

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    const expiresAt = Cookies.get("expires_at");

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

  // Monitor token expiry every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const expiresAt = Cookies.get("expires_at");
      if (!expiresAt) return;

      const currentTime = Math.floor(Date.now() / 1000) + 20;
      const expiresAtNumber = Number(expiresAt);

      if (currentTime >= expiresAtNumber && !hasReloaded.current) {
        hasReloaded.current = true; // prevent multiple reloads
        setIsLoggedIn(false); // update state to trigger cleanup
        Object.keys(Cookies.get()).forEach((cookieName) => {
          Cookies.remove(cookieName, { path: "/" });
        });
        localStorage.clear(); // clear localstorage;
        window.location.reload(); // reload the page
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        smtp,setsmtp,
        user,setuser,connected,setconnected,email,setemailconnected
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
