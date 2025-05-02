"use client";
import "./plans.css";
import React from "react";
import PlanCard from "../plan-card/PlanCard";
import { Container, Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import Badge from "react-bootstrap";

const Plans = ({ customClass }) => {
  const [activeTab, setActiveTab] = useState("annual");
  return (
    <section className={`plans sec-padding ${customClass ? customClass : ""}`}>
      <Container fluid="xl">
        <div className="heading-container position-relative">
          <h2 className="mb-4 fw-bold" style={{ paddingRight: "320px" }}>
            Choose your plan and
            <br /> automate your prospecting today
          </h2>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            transition={false}
            id="plans-tabs"
            className="position-absolute end-0 bottom-0"
          >
            <Tab
              eventKey="annual"
              title={
                <span className="d-inline-flex align-items-center">
                  Annual{" "}
                  <span className="badge bg-light ms-2 color-dark py-2">
                    Save 15%
                  </span>
                </span>
              }
            />
            <Tab eventKey="monthly-plans" title="Monthly" />
          </Tabs>
        </div>
        {activeTab === "monthly-plans" && (
          <Row className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
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
                  "Up to 5 LinkedIn + 5 Email accounts",
                  "1 ScaleLeads dashboard to manage everything",
                  "Campaigns split across all accounts for higher volume",
                  "Reports + performance overview",
                ]}
              />
            </Col>
          </Row>
        )}
        {activeTab === "annual" && (
          <Row className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
            <Col>
              <PlanCard
                planid="price_1RKCuQKgPTS0WsruoDufbl8z"
                title="Starter Offer"
                price="169.16"
                saveAnnually="358"
                features={[
                  "1 LinkedIn + 1 Email connected",
                  "1 active campaign",
                  "Fully automated execution (email + LinkedIn)",
                ]}
              />
            </Col>
            <Col>
              <PlanCard
                planid="price_1RKCw9KgPTS0WsruVr1KjdVA"
                title="Pro Offer"
                price="296.66"
                saveAnnually="628"
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
                planid="price_1RKCxVKgPTS0WsruPMixNSU2"
                title="Elite Offer"
                price="424.16"
                saveAnnually="898"
                features={[
                  "Up to 5 LinkedIn + 5 Email accounts",
                  "1 ScaleLeads dashboard to manage everything",
                  "Campaigns split across all accounts for higher volume",
                  "Reports + performance overview",
                ]}
              />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Plans;
