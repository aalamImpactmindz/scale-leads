"use client";
import "./success.css";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const PaymentSuccessful = () => {
  return (
    <div className="payment-successful sec-padding">
      <Container className="text-center">
        <FontAwesomeIcon icon={faCircleCheck} className="mb-3 text-success" />
        <h2>Payment Successful!</h2>
        <p>Your payment has been completed.</p>
        <a href="https://dashboard-scaleleads.netlify.app/">
          <Button className="btn-main">Go to Dashboard</Button>
        </a>
      </Container>
    </div>
  );
};

export default PaymentSuccessful;
