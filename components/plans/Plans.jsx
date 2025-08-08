"use client";
import "./plans.css";
import React from "react";
import PlanCard from "../plan-card/PlanCard";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext } from "@/app/context/Authcontext";
import { useContext } from "react";

const Plans = ({ customClass }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("annual");
  const [usersPlan, setUsersPlan] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/plans");
      const allPlans = response.data.plans;
      // Separate plans by interval
      const monthly = allPlans.filter((plan) => plan.interval === "month");
      const yearly = allPlans.filter((plan) => plan.interval === "year");
      setMonthlyPlans(monthly);
      setYearlyPlans(yearly);
    } catch (err) {
      console.log("Error fetching plans:", err);
      setError("Could not load Plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedIn === "true" || isLoggedIn === true) {
      const cookies = document.cookie.split("; ").reduce((acc, current) => {
        const [name, value] = current.split("=");
        acc[name] = value;
        return acc;
      }, {});

      if (cookies.has_active_plan === "true") {
        const planString = localStorage.getItem("plan");
        if (planString) {
          try {
            const plan = JSON.parse(planString);
            setUsersPlan(plan);
          } catch (e) {
            console.error("Failed to parse plan from localStorage", e);
            setUsersPlan(null);
          }
        }
      } else {
        setUsersPlan(null);
      }
    }
  }, [isLoggedIn]);

  return (
    <section
      className={`plans sec-padding mb-4 ${customClass ? customClass : ""}`}
    >
      <Container fluid="xl">
        <div className="heading-container position-relative">
          <h2 className="mb-4 fw-bold" style={{ paddingRight: "320px" }}>
            Abonnements
          </h2>
          <p>Essayez gratuitement pendant 7 jours, sans engagement</p>
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
                  Annuel{" "}
                  <span className="badge bg-light ms-2 color-dark py-2">
                    Économisez 15 %
                  </span>
                </span>
              }
            />
            <Tab eventKey="monthly-plans" title="Mensuel" />
          </Tabs>
        </div>
        {loading ? (
          <div className="text-center py-5">
            <p className="mt-3">Plans de chargement...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="px-3 py-2 small">
            {error}
          </Alert>
        ) : (
          <>
            {activeTab === "monthly-plans" && (
              <Row className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
                {monthlyPlans.map((plan, index) => (
                  <Col key={plan.id}>
                    <PlanCard
                      planid={plan.price_id}
                      title={plan.name}
                      price={plan.amount}
                      features={plan.features}
                      customClass={
                        usersPlan &&
                        usersPlan.interval === "month" &&
                        usersPlan.name === plan.name
                          ? "votre plan"
                          : ""
                      }
                    />
                  </Col>
                ))}
              </Row>
            )}
            {activeTab === "annual" && (
              <Row className="g-3 g-lg-4 row-cols-1 row-cols-md-3">
                {yearlyPlans.map((plan, index) => (
                  <Col key={plan.id}>
                    <PlanCard
                      planid={plan.price_id}
                      title={plan.name}
                      price={plan.amount}
                      features={plan.features}
                      customClass={
                        usersPlan &&
                        usersPlan.interval === "year" &&
                        usersPlan.name === plan.name
                          ? "votre plan"
                          : ""
                      }
                    />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Plans;
