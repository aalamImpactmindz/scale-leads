import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import imageAppView from "@/public/assets/images/app-view.png";

const Hero = () => {
  return (
    <section className="hero sec-padding ">
      <Container fluid="xl">
        <Row className="row-cols-1 row-cols-lg-2 my-5">
          <Col>
            <h1 className="text-light fw-normal display-5 mt-0">
              <strong>Generate Qualified Leads</strong>
              <br /> while you sleep.
            </h1>
            <p className="lh-lg mb-4 fs-5 fw-light">
              ScaleLeads automates 100% of your prospecting via email &
              LinkedIn. No need for Zapier,PhantomBuster, or writing a single
              message. Just connect your accounts once. Fill out a form. And let
              it run.
            </p>
            <Button className="btn-bg text-uppercase mt-2">
              Launch my prospecting <FontAwesomeIcon icon={faArrowRightLong} className="ms-2" />
            </Button>
            {/* <Button className="btn-main text-uppercase mt-2">Free Trial</Button> */}
          </Col>
          <Col className="d-none d-lg-block">
          <Image src={imageAppView} priority={true} alt="App View" className="mw-100 object-fit-contain" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
