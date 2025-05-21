"use client";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ResetPassword = () => {
  return (
      <div className="page-reset-password sec-padding">
        <Container fluid="xl">
          <Heading title="Reset Password" />
          <Row className="justify-content-center">
            <Col sm={10} md={8} lg={6}>
              <div className="bg-gray p-3 p-lg-4">
                <p>
                  Enter your e-mail address to reset your password. Further
                  instructions will be sent per e-mail.
                </p>
                <Form className="mt-4">
                  <Form.Group
                    className="mb-3"
                    controlId="formResetPasswordEmail"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="jane@framer.com" />
                  </Form.Group>
                  <Button className="btn-main" type="submit">
                    Reset Password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default ResetPassword;
