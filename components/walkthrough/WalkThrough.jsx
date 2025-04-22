import React from "react";
import { Container } from "react-bootstrap";
import imagePoster from "@/public/assets/images/poster.png"

const WalkThrough = () => {
  return (
    <div className="walkthrough sec-padding">
      <Container fluid="xl">
        <h2 className="fw-bold">
          What does the <span className="color-theme-25">prospecting tool look like?</span>
        </h2>
        <p className="fs-5 mb-2 fw-light">Here's exactly what you get when you subscribe:</p>
        <p className="fw-bold fs-5 mb-5">the dashboard, campaigns, stats — everything you'll see once logged in.</p>
        <video
          className="w-100"
          preload="auto"
          controls
          poster={imagePoster.src}
          style={{ maxWidth: "100%" }}
        >
          <source src="/assets/videos/demo.mp4" type="video/mp4" />
        </video>
      </Container>
    </div>
  );
};

export default WalkThrough;
