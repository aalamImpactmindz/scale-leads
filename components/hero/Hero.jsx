import "./hero.css";
import React from "react";
import { Container } from "react-bootstrap";

const Hero = () => {
  return (
    <section className="hero mt-4">
      <Container>
        <div className="bg-gray rounded-5 py-4 px-5 overflow-hidden" data-aos="fade-up">
          <h1 className="my-0 display-1 fw-semibold color-light" data-aos="fade-up">
            Automatiser votre <span className="color-theme">prospection</span>{" "}
            LinkedIn & Email en <span className="color-theme">1 clic</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Automatiser votre prospection et obtenez 3 x plus de résultats sans
            effort
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
