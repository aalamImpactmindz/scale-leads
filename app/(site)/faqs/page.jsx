import AllFaqs from "@/components/all-faqs/AllFaqs";
import "./faqs.css";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";

const Faqs = () => {
  return (
    <div className="page-faqs sec-padding">
      <Container fluid="xl">
        <Heading
          title="Frequently Asked Questions"
          highlightedWords={["Questions"]}
          description="Have questions about our AI-Powered Design Assistant? Find answers to the most common questions and learn how our platform can enhance your creative process."
        />
        <AllFaqs />
      </Container>
    </div>
  );
};

export default Faqs;
