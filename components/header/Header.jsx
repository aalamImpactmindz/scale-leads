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
import { signOut } from "next-auth/react";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isClient, setIsClient] = useState(false);

  // Ensure the code only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async() => {
    if (isClient) {
      setIsLoggedIn(false);
      
        Cookies.remove("authToken");
         Cookies.remove("microsoft_access_token");
         Cookies.remove("gmail_access_token");
             Cookies.remove("user_token");
      localStorage.clear();
      await signOut();
      window.location.href = "/login";
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
          {(isLoggedIn === "false" || isLoggedIn === false) && (
            <Link href="/login" className="ms-auto ms-lg-4">
              <Button className="btn-main">Se connecter</Button>
            </Link>
          )}
          {(isLoggedIn === "true" || isLoggedIn === true) && (
            <Link href="/" className="ms-auto ms-lg-4" onClick={handleLogout}>
              <Button className="btn-main">se déconnecter</Button>
            </Link>
          )}
          {(isLoggedIn === "false" || isLoggedIn === false) && (
            <Link href="/register" className="ms-2 ms-lg-4">
              <Button className="btn-main">S’inscrire</Button>
            </Link>
          )}
          {/* login condition */}
          {(isLoggedIn === "true" || isLoggedIn === true) && (
            <Link href="/dashboard" className="ms-2 ms-lg-4">
              <Button className="btn-main">Tableau de bord</Button>
            </Link>
          )}
          <Navbar.Toggle aria-controls="navbar-main" className="ms-2" />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
