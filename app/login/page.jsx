"use client";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";

const Login = () => {
  return (
    <div className="page-login sec-padding">
      <Container fluid="xl">
        <Heading title="My Account" />
        <Row className="row-cols-1 row-cols-md-2 g-3 g-md-4">
          <Col>
            <div className="bg-gray p-3 rounded-md-5">
              <h4 className="color-light">Login</h4>
              <p>Already have an account? Log in to continue.</p>
              <Form className="mt-4">
                <Form.Group className="mb-3" controlId="formLoginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="jane@framer.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="********" />
                </Form.Group>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <Button className="btn-main" type="submit">
                    Login
                  </Button>
                  <Link href="/reset-password">Forgot Password?</Link>
                </div>
              </Form>
            </div>
          </Col>
          <Col>
            <div className="bg-gray p-3 rounded-md-5 h-100">
              <h4 className="color-light">New Customer?</h4>
              <p>
                Create an account to easily track your order status and view
                your purchase history. We'll set up your account quickly and
                only ask for the information needed to make your shopping
                experience faster and smoother.
              </p>
              <Link href="/register">
                <Button className="btn-main">Register</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
