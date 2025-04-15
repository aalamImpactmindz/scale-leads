import React from "react";
import PlanCard from "../plan-card/PlanCard";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "../heading/Heading";

const Plans = () => {
  return (
    <section className="plans sec-padding">
      <Container fluid="xl">
        <Heading
          title="Choisis ton plan et automatise ta prospection dès aujourd'hui"
          highlightedWords={["automatise", "aujourd'hui"]}
          description="Nos offres sont conçu pour t'aider à automatiser ta prospection et obtenir plus de clients sans effort. Choisis le plan qui te correspond et commence dès maintenant."
        />
        <Row data-aos="fade-up" className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
          <Col>
            <PlanCard
              title="OFFRE STARTER"
              price="199"
              description="Pour tester la prospection automatisée, 100% par email."
              features={[
                "+200 Prospects ultra-ciblés/mois",
                "Campagne Email automatisée",
                "Suivi sur tableau (Airtable)",
              ]}
            />
          </Col>
          <Col>
            <PlanCard
              title="OFFRE PREMIUM"
              price="349"
              description="Pour passer à la vitesse supérieure avec LinkedIn + Email."
              features={[
                "+400 Prospects ultra-ciblés/mois",
                "Prospection automatisée LinkedIn & Email",
                "Optimisation des messages",
                "Relances automatiques",
                "Reporting en temps réel (Airtable)",
              ]}
              customClass="popular"
            />
          </Col>
          <Col>
            <PlanCard
              title="OFFRE VIP"
              price="499"
              description="Notre meilleur offre pour remplir ton agenda sans effort."
              features={[
                "+600 Prospects ultra-ciblés/mois",
                "Campagne LinkedIn & Email 100% automatisées",
                "A/B Testing des messages",
                "Analyse de performance + reporting avancé",
                "Support prioritaire 24/24",
                "Espace de suivi personnalisé",
              ]}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Plans;
