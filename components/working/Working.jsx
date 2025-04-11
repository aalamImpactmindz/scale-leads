import React from "react";
import WorkingCard from "../working-card/WorkingCard";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "../heading/Heading";
import logo from "@/public/assets/images/logo.png";
import arrowTopLeft from "@/public/assets/images/arrow-top-left.svg";
import userMultiple from "@/public/assets/images/user-multiple.svg";
import rocket from "@/public/assets/images/rocket.svg";

const Working = () => {
  return (
    <section className="working sec-padding" id="how-it-works">
      <Container>
        <Heading
          title="Comment ça marche ?"
          highlightedWords={["marche"]}
          description="Notre système automatise ta prospection en 3 étapes simples. plus besoin de passer des heures à chercher des clients, on s'en occupe pour vous !"
        />
        <Row data-aos="fade-up">
          <Col>
            <WorkingCard
              icon={arrowTopLeft}
              title="On trouve tes clients idéaux"
              description="Nous identifions les meilleurs prospects pour ton business grâce a une analyse intelligente."
            />
          </Col>
          <Col>
            <WorkingCard
              icon={userMultiple}
              title="On automatise la prospection"
              description="Nous envoyons automatiquement des invitations et messages aux bonnes personnes."
            />
          </Col>
          <Col>
            <WorkingCard
              icon={rocket}
              title="Transforme tes prospects en clients"
              description="Tu échanges avec des prospects qualifiés et fermes plus de vente sans effort."
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Working;
