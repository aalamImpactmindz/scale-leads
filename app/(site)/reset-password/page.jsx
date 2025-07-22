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
         
          <Heading title="Réinitialiser le mot de passe" />
          <Row className="justify-content-center">
            <Col sm={10} md={8} lg={6}>
              <div className="bg-gray p-3 p-lg-4">
                <p>
                  Entrez votre adresse email pour réinitialiser votre mot de passe. D'autres instructions seront envoyées par e-mail.
                </p>
                <Form className="mt-4">
                  <Form.Group
                    className="mb-3"
                    controlId="formResetPasswordEmail"
                  >
                    <Form.Label>Adresse e-mail</Form.Label>
                    <Form.Control type="email" placeholder="jane@framer.com" />
                  </Form.Group>
                  <Button className="btn-main" type="submit">
                  Réinitialiser le mot de passe
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
