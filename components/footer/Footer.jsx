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
          <h2 className="fw-bold">Launch your prospecting tool today</h2>
          <p>in 5 minutes, no credit card needed.</p>
          <Form className="d-flex flex-wrap flex-column flex-sm-row gap-3">
            <Form.Group controlId="formFooterEmail">
              <Form.Control type="email" placeholder="Email address" />
            </Form.Group>
            <Button className="btn-bg text-uppercase" type="submit">
              Start now{" "}
              <FontAwesomeIcon icon={faArrowRightLong} className="ms-2" />
            </Button>
          </Form>
        </div>
        <div className="ftr-bottom pt-4 border-top border-gray d-flex flex-wrap flex-column flex-md-row gap-3 align-items-center justify-content-between">
          <Logo />
          <div className="d-flex flex-wrap align-items-center">
            Follow Us
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
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
          <p className="ms-md-auto mb-0 text-center text-sm-left">
            Powered by ScaleLeads. All Right Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
