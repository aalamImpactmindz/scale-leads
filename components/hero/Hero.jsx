import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import imageAppView from "@/public/assets/images/app-view.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero sec-padding ">
      <Container fluid="xl">
        <Row className="row-cols-1 row-cols-lg-2 my-5 ">
          <Col>
            <h1 className="text-light fw-normal display-5 mt-0">
              <strong>Automatise s ta prospection.</strong>
              <br /> Ne perds plus de temps à prospecter.
            </h1>
            <p className="lh-lg mb-4 fs-5 fw-light">
              ScaleLeads trouve, contacte et relance tes prospects
              automatiquement sur LinkedIn et Email. Toi, tu closes. C'est tout.
            </p>
            <Link href="/abonnement">
              <Button className="btn-bg text-uppercase mt-2">
                Démarrer l'essaie gratuit{" "}
                <FontAwesomeIcon icon={faArrowRightLong} className="ms-2" />
              </Button>
            </Link>
            {/* <Button className="btn-main text-uppercase mt-2">Free Trial</Button> */}
          </Col>
          <Col className="d-none d-lg-block">
            <Image
              src={imageAppView}
              priority={true}
              alt="App View"
              className="mw-100 object-fit-contain "
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
