import "./footer.css";
import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../logo/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray sec-padding mt-auto">
      <Container fluid="xl">
        <div className="ftr-top d-flex flex-wrap flex-column flex-md-row gap-3 align-items-center justify-content-between">
          <Logo />
          <ul className="ls-none d-flex flex-wrap justify-content-center gap-3 gap-sm-4 color-light">
            <li>
              <Link href="/#how-it-works">How it Works</Link>
            </li>
            <li>
              <Link href="/">Features</Link>
            </li>
            <li>
              <Link href="/abonnement">Pricing</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/faqs">Faqs</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="ftr-bottom mt-5 pt-4 border-top border-gray small d-flex flex-wrap flex-column flex-md-row gap-3 align-items-center justify-content-between">
          <p className="mb-0 text-center text-sm-left">&copy; Copyright 2025 | ScaleLeads | All Rights Reserved</p>
          <ul className="ls-none d-flex flex-wrap gap-4">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-conditions">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
