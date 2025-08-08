import "./faqs.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Heading from "../heading/Heading";
import AllFaqs from "../all-faqs/AllFaqs";

const Faqs = () => {
  return (
    <section className="faqs sec-padding pt-0">
      <Container fluid="xl">
        <div className="p-3 p-md-5">
          <Row className="row-cols-1 row-cols-lg-2 align-items-center">
            <Col>
              <Heading
                title="Questions fréquemment posées"
                highlightedWords={["Questions"]}
                description="Vous avez des questions sur notre assistant de conception basé sur l'IA ? Trouvez les réponses aux questions fréquentes et découvrez comment notre plateforme peut optimiser votre processus créatif."
                customClass="pe-0"
              />
            </Col>
            <Col>
              <AllFaqs />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Faqs;
