import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <section className="not-found sec-padding">
      <Container fluid="xl" className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="color-theme fs-1 mb-2 text-uppercase fw-bold mb-3">Page not found!</h1>
        <p className="text-center mb-4">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link href="/">
          <button type="button" className="btn-main btn btn-primary">
            Go to Homepage
          </button>
        </Link>
      </Container>
    </section>
  );
};

export default PageNotFound;
