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
    console.log(isLoggedIn);
    if (
      (isLoggedIn || isLoggedIn === null) &&
      localStorage.getItem("has_active_plan") === "false"
    ) {
      setMessage("You don't have an active plan. Please purchase a plan.");
    }
  }, []);
  // console.log(message);
  return (
    <div className="page-abonnement">
      <Container className="mt-3">
        {message !== "" && <Alert variant="warning">{message}</Alert>}
      </Container>
      <Plans />
      <Faqs />
    </div>
  );
};

export default Abonnement;
