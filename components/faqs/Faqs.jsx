import "./faqs.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "../heading/Heading";
import AllFaqs from "../all-faqs/AllFaqs";

const Faqs = () => {
  return (
    <section className="faqs sec-padding pt-0">
      <Container fluid="xl">
        <div className="p-3 p-md-5">
          <Row className="row-cols-1 row-cols-lg-2 align-items-center">
            <Col>
              <Heading
                title="Frequently Asked Questions"
                highlightedWords={["Questions"]}
                description="Have questions about our AI-Powered Design Assistant? Find answers to the most common questions and learn how our platform can enhance your creative process."
                customClass="pe-0"
              />
            </Col>
            <Col>
              <AllFaqs />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Faqs;
