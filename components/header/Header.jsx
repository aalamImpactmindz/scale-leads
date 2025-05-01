"use client";
import "./header.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import Logo from "../logo/Logo";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@/app/context/Authcontext";
import { useContext } from "react";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  // Ensure the code only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    if (isClient) {
      setIsLoggedIn(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <header className="bg-theme-100">
      <Navbar expand="lg">
        <Container fluid="xl">
          <Logo />
          <Navbar.Collapse id="navbar-main">
            <Nav className="ms-auto gap-3 gap-lg-4">
              <Link className="nav-link" href="/">
                Accueil
              </Link>
              <NavDropdown title="Fonctionnalités" id="features-dropdown">
                <Link className="dropdown-item" href="/">
                  Fonctionnalité 1
                </Link>
                <Link className="dropdown-item" href="/">
                  Fonctionnalité 2
                </Link>
                <Link className="dropdown-item" href="/">
                  Fonctionnalité 3
                </Link>
              </NavDropdown>
              <NavDropdown title="Abonnements" id="subscriptions-dropdown">
                <Link className="dropdown-item" href="/">
                  Abonnement 1
                </Link>
                <Link className="dropdown-item" href="/">
                  Abonnement 2
                </Link>
                <Link className="dropdown-item" href="/">
                  Abonnement 3
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
                FAQ
              </Link>
            </Nav>
          </Navbar.Collapse>
          {!isLoggedIn && (
            <Link href="/login" className="ms-auto ms-lg-4">
              <Button className="btn-main">Login</Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/" className="ms-3 ms-lg-4" onClick={handleLogout}>
              <Button className="btn-main">Logout</Button>
            </Link>
          )}
          <Link href="/register" className="ms-3 ms-lg-4">
            <Button className="btn-main">Sign up</Button>
          </Link>
          <Navbar.Toggle aria-controls="navbar-main" className="ms-3" />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
