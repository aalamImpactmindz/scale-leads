import "./plans.css";
import React from "react";
import PlanCard from "../plan-card/PlanCard";
import { Container, Row, Col } from "react-bootstrap";

const Plans = ({ customClass }) => {
  return (
    <section className={`plans sec-padding ${customClass ? customClass : ""}`}>
      <Container fluid="xl">
        <h2 className="mb-5">
          Choose your plan and
          <br /> automate your prospecting today
        </h2>
        <Row data-aos="fade-up" className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
          <Col>
            <PlanCard
              planid="price_1RIlbsKgPTS0Wsru4dvuodiJ"
              title="Starter Offer"
              price="199"
              features={[
                "1 LinkedIn + 1 Email connected",
                "1 active campaign",
                "Fully automated execution (email + LinkedIn)",
              ]}
            />
          </Col>
          <Col>
            <PlanCard
            planid="price_1RImt4KgPTS0WsrulgxTjEG0"
              title="Pro Offer"
              price="349"
              features={[
                "Up to 3 LinkedIn + 3 Email accounts",
                "1 ScaleLeads dashboard to manage everything",
                "Campaigns split across all accounts for higher volume",
                "Reports + performance overview",
              ]}
              customClass="popular"
            />
          </Col>
          <Col>
            <PlanCard
            planid="price_1RImtyKgPTS0WsruUnSrW8TH"
              title="Elite Offer"
              price="499"
              features={[
                "Up to 3 LinkedIn + 3 Email accounts",
                "1 ScaleLeads dashboard to manage everything",
                "Campaigns split across all accounts for higher volume",
                "Reports + performance overview",
              ]}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Plans;
