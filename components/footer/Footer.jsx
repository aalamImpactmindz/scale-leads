"use client";
import "./footer.css";
import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../logo/Logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray sec-padding-small mt-auto">
      <Container fluid="xl">
        <div className="ftr-top mb-5">
          <h2 className="fw-bold">Lancez votre outil de prospection dès aujourd'hui</h2>
          <p>en 5 minutes, aucune carte de crédit nécessaire.</p>
          <Form className="d-flex flex-wrap flex-column flex-sm-row gap-3">
            <Form.Group controlId="formFooterEmail">
              <Form.Control type="email" placeholder="Adresse e-mail" />
            </Form.Group>
            <Button className="btn-bg text-uppercase" type="submit">
              Commencez maintenant{" "}
              <FontAwesomeIcon icon={faArrowRightLong} className="ms-2" />
            </Button>
          </Form>
        </div>
        <div className="ftr-bottom pt-4 border-top border-gray d-flex flex-wrap flex-column flex-md-row gap-3 align-items-center justify-content-between">
          <Logo />
          <div className="d-flex flex-wrap align-items-center">
            Suivez-nous
            <ul className="ls-none d-flex flex-wrap justify-content-center gap-2 color-light ms-3">
              <li>
                <Link
                  href="/"
                  className="bg-theme-25 rounded-circle d-flex flex-wrap align-items-center justify-content-center"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="bg-theme-25 rounded-circle d-flex flex-wrap align-items-center justify-content-center"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="bg-theme-25 rounded-circle d-flex flex-wrap align-items-center justify-content-center"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="bg-theme-25 rounded-circle d-flex flex-wrap align-items-center justify-content-center"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright mt-4 small d-flex flex-wrap flex-column flex-md-row gap-3 align-items-center justify-content-between">
         
          <footer style={{textAlign: 'center' }}>
  <Link href="/privacy-policy">Politique de confidentialité</Link> |{' '}
  <Link href="/terms-conditions">Termes et conditions</Link>
</footer>
          <p className="ms-md-auto mb-0 text-center text-sm-left">
            Propulsé par ScaleLeads. Tous droits réservés
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
