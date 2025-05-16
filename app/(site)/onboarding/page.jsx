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
import axiosInstance from "@/utils/axiosInstance";

const Onboarding = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const router = useRouter();

  const fetchUsersStatus = async () => {
    try {
      const response = await axiosInstance.get("/api/status");
      console.log(response);
      if (
        response.data.on_boarding_form === true &&
        response.data.messages === true
      ) {
        router.push("/");
      } else if (
        response.data.on_boarding_form === true &&
        response.data.messages === false
      ) {
        router.push("/messages");
      } else if (response.data.on_boarding_form === false) {
        router.push("/onboarding");
      }
    } catch (err) {
      console.log("Error fetching user's status:", err);
    }
  };

  useEffect(() => {
    fetchUsersStatus();
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
