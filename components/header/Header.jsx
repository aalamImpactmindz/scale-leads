"use client";
import "./header.css";
import React from "react";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import Logo from "../logo/Logo";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="bg-theme-100">
      <Navbar expand="lg">
        <Container fluid="xl">
          <Logo />
          <Navbar.Collapse id="navbar-main">
            <Nav className="ms-auto gap-3 gap-lg-5">
              <Link className="nav-link" href="/">
                Home
              </Link>
              <NavDropdown title="Features" id="features-dropdown">
                <Link className="dropdown-item" href="/">
                  Feature 1
                </Link>
                <Link className="dropdown-item" href="/">
                  Feature 2
                </Link>
                <Link className="dropdown-item" href="/">
                  Feature 3
                </Link>
              </NavDropdown>
              <NavDropdown title="Subscriptions" id="subscriptions-dropdown">
                <Link className="dropdown-item" href="/">
                  Subscription 1
                </Link>
                <Link className="dropdown-item" href="/">
                  Subscription 2
                </Link>
                <Link className="dropdown-item" href="/">
                  Subscription 3
                </Link>
              </NavDropdown>
              <NavDropdown title="Blogs" id="blogs-dropdown">
                <Link className="dropdown-item" href="/">
                  Blog 1
                </Link>
                <Link className="dropdown-item" href="/">
                  Blog 2
                </Link>
                <Link className="dropdown-item" href="/">
                  Blog 3
                </Link>
              </NavDropdown>
              <Link className="nav-link" href="/faqs">
                FAQs
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Link href="/contact" className="ms-auto ms-lg-5">
            <Button className="btn-main">Contact</Button>
          </Link>
          <Navbar.Toggle aria-controls="navbar-main" className="ms-4" />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
