import "./solutions.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import imageSolution from "@/public/assets/images/solution.png";

const Solution = () => {
  return (
    <div className="solution mb-5 pb-5">
      <Container fluid="xl">
        <div className="solution-container p-3 p-sm-5 ps-0 ps-sm-0">
          <Row className="row-cols-1 row-cols-lg-2 flex-column-reverse flex-lg-row align-items-center">
            <Col>
              <Image src={imageSolution} alt="Solution" />
            </Col>
            <Col className="ps-4 ps-sm-5 ps-lg-0">
              <h2 className="fw-bold mb-5">
                Conçu pour les freelances, agences et consultants B2B.
              </h2>
              {/* <p className="fs-5 mb-4">
                You connect your email and LinkedIn once?
              </p> */}
              <div className="solutions p-3 p-md-4 p-lg-5">
                <p>
                  Si tu vends une offre B2B avec un panier supérieur à 500€,
                  ScaleLeads est fait pour toi.
                </p>
                <p>
                  Tu veux plus de rendez-vous sans t'épuiser ? C'est bon, t'as
                  trouvé.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Solution;
