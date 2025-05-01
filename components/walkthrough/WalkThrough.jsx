import React from "react";
import { Container } from "react-bootstrap";
import imagePoster from "@/public/assets/images/poster.png";

const WalkThrough = () => {
  return (
    <div className="walkthrough sec-padding">
      <Container fluid="xl">
        <h2 className="fw-bold mb-3">Comment ça fonctionne ?</h2>
        <p className="fs-5 mb-2">
          <strong className="d-block fw-medium color-light">Étape 1 - Tu remplis un brief</strong>
          <span className="fw-light">
            Ton offre, ta cible, ton ton, tes préférences → en 5 minutes c'est
            réglé.
          </span>
        </p>
        <p className="fs-5 mb-2">
          <strong className="d-block fw-medium color-light">
            Étape 2 - Tu connectes tes comptes
          </strong>
          <span className="fw-light">LinkedIn + Email, une seule fois.</span>
        </p>
        <p className="fs-5 mb-2">
          <strong className="d-block fw-medium color-light">Étape 3 - Tout tourne sans toi</strong>
          <span className="fw-light">
            Les messages partent, les relances aussi. Tu vois tout sur le
            dashboard.
          </span>
        </p>
        <video
          className="w-100 mt-3"
          preload="auto"
          autoPlay
          muted
          poster={imagePoster.src}
          style={{ maxWidth: "100%" }}
        >
          <source src="/assets/videos/dashboard.mp4" type="video/mp4" />
        </video>
      </Container>
    </div>
  );
};

export default WalkThrough;
