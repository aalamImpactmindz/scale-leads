"use client";
import "./cancel.css";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const PaymentFailed = () => {
  return (
    <div className="payment-failed sec-padding">
      <Container className="text-center">
        <FontAwesomeIcon icon={faCircleXmark} className="mb-3 text-danger" />
        <h2>Payment Failed!</h2>
        <p>An error occured while processing your payment.</p>
        <Link href="/">
          <Button className="btn-main">Go to Homepage</Button>
        </Link>
      </Container>
    </div>
  );
};

export default PaymentFailed;
