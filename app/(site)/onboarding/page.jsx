"use client";
import "./onboarding.css";
import React from "react";
import { Container } from "react-bootstrap";
import OnboardingForm from "@/components/forms/onboarding-form/OnboardingForm";

const Onboarding = () => {
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
