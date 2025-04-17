import "./hero.css";
import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Hero = () => {
  return (
    <section className="hero mt-4">
      <Container fluid="xl">
        <div
          className="bg-gray rounded-md-5 p-3 p-md-5 overflow-hidden d-flex flex-wrap flex-column justify-content-center align-items-start"
          data-aos="fade-up"
        >
          <h1
            className="my-0 display-1 fw-semibold color-light"
            data-aos="fade-up"
          >
            Générez des <span className="color-theme">leads</span> qualifiés
            pendant que vous <span className="color-theme">dormez.</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="100">
            ScaleLeads automatise 100 % de votre prospection via email &
            LinkedIn.Pas besoin de Zapier, PhantomBuster ou d'écrire un seul
            message.Connectez vos comptes une seule fois. Remplissez un
            formulaire. Et laissez tourner.
          </p>
          <Button className="btn-main">Lancer ma machine (essai gratuit, sans CB)</Button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
