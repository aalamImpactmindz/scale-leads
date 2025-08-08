import React from "react";
import { Container } from "react-bootstrap";
import Testimonials from "../testimonials/Testimonials";

const SuccessStories = ({ customClass }) => {
  return (
    <section
      className={`success-stories sec-padding ${
        customClass ? customClass : ""
      }`}
    >
      <Container fluid="xl">
        <h2 className="text-uppercase text-center mb-5 fw-bold">
          <span className="color-theme-25">Client</span> Réponse
        </h2>
        <Testimonials />
      </Container>
    </section>
  );
};

export default SuccessStories;
