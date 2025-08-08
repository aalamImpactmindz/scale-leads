"use client";
import "./contact-form.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ContactForm = () => {
  return (
    <Form className="text-start p-3 p-md-4 bg-gray m-auto" id="contact-form">
      <Form.Group className="mb-3" controlId="contactFormName">
        <Form.Label className="small">Nom</Form.Label>
        <Form.Control type="text" placeholder="Jane Smith" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="contactFormEmail">
        <Form.Label className="small">Email</Form.Label>
        <Form.Control type="email" placeholder="jane@framer.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="contactFormMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={6} placeholder="Message" />
      </Form.Group>

      <Button className="btn-main w-100 rounded-3" type="submit">
        Envoyé
      </Button>
    </Form>
  );
};

export default ContactForm;
