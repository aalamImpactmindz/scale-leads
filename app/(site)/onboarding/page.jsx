"use client";
import "./onboarding.css";
import React from "react";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import OnboardingForm from "@/components/forms/onboarding-form/OnboardingForm";
import { useContext } from "react";
import { AuthContext } from "@/app/context/Authcontext";

const Onboarding = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log(isLoggedIn);
    if (
      (isLoggedIn && localStorage.getItem("form_filled") === "true") ||
      localStorage.getItem("form_filled") === null
    ) {
      router.push("/messages");
    }
  }, []);

  return (
    <div className="page-onboarding sec-padding">
      <Container fluid="xl">
        <div className="bg-gray p-3 p-lg-4">
          <h4 className="color-light mb-4 fw-bold">
            Custom Client Onboarding Form
          </h4>
          <OnboardingForm onSuccess={() => router.push("/messages")} />
        </div>
      </Container>
    </div>
  );
};

export default Onboarding;
