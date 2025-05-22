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
import Cookies from "js-cookie";

const Abonnement = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn === "true" || isLoggedIn === true) {
      // Check Plan
      const hasActivePlan = Cookies.get("has_active_plan");

      if (hasActivePlan === "false" || hasActivePlan === false) {
        setMessage("You don't have an active plan. Please purchase a plan.");
      } else {
        setMessage(""); // Clear message if has active plan
      }
    } else {
      setMessage("Start with a 7-day Free trial - No commitment."); // Clear message if not logged in
    }
  }, [isLoggedIn]);

  return (
    <div className="page-abonnement">
      <Container className="mt-3" style={{ marginBottom: "-5vw" }}>
        {message !== "" && (
          <Alert variant="warning" className="px-3 py-2 small">
            {message}
          </Alert>
        )}
      </Container>
      <Plans />
      <Faqs />
    </div>
  );
};

export default Abonnement;
