"use client";
import OnboardingForm from "@/components/forms/onboarding-form/OnboardingForm";
import React from "react";

const PageDOnboarding = () => {
  return (
    <div className="onboarding mb-4">
      <h2 className="mb-4 fw-bold">Client Onboarding Form</h2>
      <div className="form-container d-bg-gradient p-4 rounded-2">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default PageDOnboarding;
