"use client";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";

const Register = () => {
  return (
    <div className="page-register sec-padding">
      <Container fluid="xl">
        <Heading title="My Account" />
        <Row className="row-cols-1 row-cols-md-2 g-3 g-md-4">
          <Col>
            <div className="bg-gray p-3 rounded-md-5">
              <h4 className="color-light">Register</h4>
              <p>Start your journey with us—it's quick and simple.</p>
              <Form className="mt-4">
                <Form.Group className="mb-3" controlId="formRegisterFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="email" placeholder="Jane Smith" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRegisterEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="jane@framer.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegisterPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="********" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formRegisterConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="********" />
                </Form.Group>
                <Button className="btn-main" type="submit">
                  Register
                </Button>
              </Form>
            </div>
          </Col>
          <Col>
            <div className="bg-gray p-3 rounded-md-5 h-100">
              <h4 className="color-light">Already Have an Account?</h4>
              <p>
                Log in to access your account, check your orders, and continue
                where you left off.
              </p>
              <Link href="/login">
                <Button className="btn-main">Login</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
