"use client";
import "./success.css";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

const PaymentSuccessful = async () => {
  const fetchUsersPlan = async () => {
    try {
      const response = await axiosInstance.get("/api/user/plan");
      const plan = response.data.plan;

      // Store in localStorage
      localStorage.setItem("plan", JSON.stringify(plan));

      // Store plan in cookies
      Cookies.set("has_active_plan", "true", {
        expires: expiresAtDate,
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
    } catch (err) {
      console.log("Error fetching user's plan:", err);
    }
  };
  useEffect(() => {
    fetchUsersPlan;
  }, []);
  return (
    <div className="payment-successful sec-padding">
      <Container className="text-center">
        <FontAwesomeIcon icon={faCircleCheck} className="mb-3 text-success" />
        <h2>Payment Successful!</h2>
        <p>Your payment has been completed.</p>
        <Link href="/dashboard">
          <Button className="btn-main">Go to Dashboard</Button>
        </Link>
      </Container>
    </div>
  );
};

export default PaymentSuccessful;
