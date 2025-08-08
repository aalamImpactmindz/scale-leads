"use client";
import "./success.css";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const PaymentSuccessful = () => {
  const router = useRouter();

  const fetchUsersPlan = async () => {
    try {
      const response = await axiosInstance.get("/api/user/plan");
      const plan = response.data.plan;

      // Store in localStorage
      localStorage.setItem("plan", JSON.stringify(plan));

      // Change has_active_plan cookie to true and can_access_protected_pages cookie to false
      const expiresAt = localStorage.getItem("expires_at");
      if (expiresAt) {
        Cookies.set("has_active_plan", "true", {
          expires: new Date(expiresAt),
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        // Cookies.set("can_access_protected_pages", "false", {
        //   expires: new Date(expiresAt),
        //   path: "/",
        //   secure: true,
        //   sameSite: "Strict",
        // });
      }
    } catch (err) {
      console.log("Error fetching user's plan:", err);
    }
  };

  useEffect(() => {
    fetchUsersPlan().then(() => {
      // Refresh the page to apply new cookie changes (middleware)
      router.refresh();
    });
  }, []);
  return (
    <div className="payment-successful sec-padding">
      <Container className="text-center">
        <FontAwesomeIcon icon={faCircleCheck} className="mb-3 text-success" />
        <h2>Paiement réussi !</h2>
        <p>Votre paiement a été effectué</p>
        <Link href="/dashboard">
          <Button className="btn-main">
            Aller au tableau de bord</Button>
        </Link>
      </Container>
    </div>
  );
};

export default PaymentSuccessful;
