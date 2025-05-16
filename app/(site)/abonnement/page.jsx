"use client";
import "./abonnement.css";
import Faqs from "@/components/faqs/Faqs";
import Plans from "@/components/plans/Plans";
import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/Authcontext";
import { Alert } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Abonnement = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      // Read cookies
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});

      if (!cookies.has_active_plan || cookies.has_active_plan !== "true") {
        setMessage("You don't have an active plan. Please purchase a plan.");
      } else {
        setMessage(""); // Clear message if has active plan
      }
    } else {
      setMessage(""); // Clear message if not logged in
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);

  return (
    <div className="page-abonnement">
      <Container className="mt-3" style={{ marginBottom: "-5vw" }}>
        {message !== "" && <Alert variant="warning" className="px-3 py-2 small">{message}</Alert>}
      </Container>
      <Plans />
      <Faqs />
    </div>
  );
};

export default Abonnement;
