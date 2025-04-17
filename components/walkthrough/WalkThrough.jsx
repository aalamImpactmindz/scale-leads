import "./walkthrough.css";
import React from "react";
import Heading from "../heading/Heading";
import { Container } from "react-bootstrap";

const WalkThrough = () => {
  return (
    <div className="walkthrough sec-padding">
      <Container className="d-flex flex-column align-items-center">
        <Heading title="Quick Walkthrough" highlightedWords={["walkthrough"]} />
        <video className="rounded-md-5 w-100" preload="auto" controls style={{ maxWidth: "1000px" }}>
          <source src="/assets/videos/demo.mp4" type="video/mp4" />
        </video>
      </Container>
    </div>
  );
};

export default WalkThrough;
