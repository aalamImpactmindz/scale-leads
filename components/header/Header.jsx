"use client";
import "./header.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Logo from "../logo/Logo";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const navRef = useRef(null);
  const togglerRef = useRef(null);

  const handleNavClick = () => {
    setNavActive(!navActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        togglerRef.current &&
        !togglerRef.current.contains(event.target)
      ) {
        setNavActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // nav links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/", label: "Features" },
    { href: "/abonnement", label: "Abonnements" },
    { href: "/blogs", label: "Blogs" },
    { href: "/faqs", label: "Faqs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`py-4 position-relative z-1 ${navActive ? "nav-active" : ""}`}
    >
      <Container
        fluid="xl"
        className="d-flex align-items-center justify-content-between position-relative"
      >
        <Logo />
        <div className="links ms-auto me-2 me-md-4 color-light">
          <Link href="/login">Login</Link>
          <span className="mx-2">|</span>
          <Link href="/register">Register</Link>
        </div>
        <div
          ref={togglerRef}
          className="nav-toggler bg-gray rounded-2 position-relative"
          onClick={handleNavClick}
        >
          <span className="bg-white position-absolute"></span>
          <span className="bg-white position-absolute"></span>
        </div>
        {navActive && (
          <div
            ref={navRef}
            className="navigation bg-gray p-3 rounded-2 color-light position-absolute top-100 mt-3 border border-gray"
          >
            <ul className="ls-none d-flex flex-column gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} onClick={() => setNavActive(false)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
