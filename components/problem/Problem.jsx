import "./problem.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Problem = () => {
  return (
    <section className="problem pb-5">
      <Container fluid="xl">
        <div className="problem-container p-3 p-md-4 p-lg-5">
          <Row className="row-cols-1 row-cols-lg-2 fs-5 g-5">
            <Col>
              <h2 className="color-theme-25 fw-bold mb-3">Problème</h2>
              <p className="fs-4 fw-light">
                
Trop d’outils, trop de configuration, aucun résultat ?
              </p>
            </Col>
            <Col>
              <ol className="d-flex flex-column gap-3 fs-4 pe-4 fw-light">
                <li>
                  Les freelances et les agences B2B perdent des heures à jongler avec les outils…
                </li>
                <li>Nous les avons tous éliminés</li>
              </ol>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Problem;
