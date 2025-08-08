"use client";
import "./onboarding.css";
import React from "react";
import { Container } from "react-bootstrap";
import OnboardingForm from "@/components/forms/onboarding-form/OnboardingForm";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const router = useRouter();
  return (
    <div className="page-onboarding sec-padding">
      <Container fluid="xl">
        <div className="bg-gray p-3 p-lg-4">
          <h4 className="color-light mb-4 fw-bold">
            Custom Client Onboarding Form
          </h4>
          <OnboardingForm
            onSuccess={() => {
              setTimeout(() => {
                router.push("/messages");
              }, 2000);
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Onboarding;
