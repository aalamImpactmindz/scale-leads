import React from "react";
import WorkingCard from "../working-card/WorkingCard";
import { Container, Row, Col } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const Working = ({ customClass }) => {
  return (
    <section
      className={`working sec-padding ${customClass ? customClass : ""}`}
      id="how-it-works"
    >
      <Container fluid="xl">
        <h2 className="mb-4 fw-bold">Pourquoi ScaleLeads change la donne ?</h2>
        <Row className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
          <Col>
            <WorkingCard
              icon={faMagnifyingGlass}
              title="Ciblage ultra précis"
              description="Remplis un simple formulaire, on s'occupe de trouver les bons prospects."
            />
          </Col>
          <Col>
            <WorkingCard
              icon={faMessage}
              title="Messages générés automatiquement"
              description="Grâce à l'IA, chaque message est personnalisé, personnalisable, aligné avec ton offre et en raccord avec le profil LinkedIn du prospect."
            />
          </Col>
          <Col>
            <WorkingCard
              icon={faRotate}
              title="100% automatisé"
              description="Tout tourne tout seul. Envois, relances, suivi - t'as plus rien à faire."
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Working;
