import "./contact.css";
import ContactForm from "@/components/contact-form/ContactForm";
import Faqs from "@/components/faqs/Faqs";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";

const Contact = () => {
  return (
    <div className="page-contact">
      <Container fluid="xl" className="sec-padding pb-0 text-center">
        <Heading
          title="Contacte Nous"
          highlightedWords={["Nous"]}
          description="vous avez des question ou avez besoin d'aide? Écrivez nous nous sommes la pour vous."
        />
        <ContactForm />
      </Container>
      <Faqs />
    </div>
  );
};

export default Contact;
