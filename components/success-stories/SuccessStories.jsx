import React from "react";
import { Container } from "react-bootstrap";
import Heading from "../heading/Heading";

const SuccessStories = () => {
  return (
    <section className="success-stories sec-padding">
      <Container fluid="xl">
        <Heading
          title="Customer Success Stories"
          highlightedWords={["Success"]}
          description="Discover how our platform has helped businesses create outstanding content effortlessly. Hear directly from our users about their success and satisfaction."
        />
      </Container>
    </section>
  );
};

export default SuccessStories;
