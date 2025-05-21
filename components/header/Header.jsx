"use client";
import "./header.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import Logo from "../logo/Logo";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";
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
      Cookies.remove("authToken", { path: "/" });
      Cookies.remove("expires_at", { path: "/" });
      Cookies.remove("onboarding_form_filled", { path: "/" });
      Cookies.remove("messages_filled", { path: "/" });
      Cookies.remove("has_active_plan", { path: "/" });
      localStorage.removeItem("plan");
      localStorage.removeItem("expires_at");
      window.location.reload(); // reload the page
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
            <Link href="/" className="ms-auto ms-lg-4" onClick={handleLogout}>
              <Button className="btn-main">Logout</Button>
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/register" className="ms-2 ms-lg-4">
              <Button className="btn-main">Sign up</Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/dashboard" className="ms-2 ms-lg-4">
              <Button className="btn-main">Dashboard</Button>
            </Link>
          )}
          <Navbar.Toggle aria-controls="navbar-main" className="ms-2" />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
