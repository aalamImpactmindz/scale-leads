import "./contact.css";
import ContactForm from "@/components/forms/contact-form/ContactForm";
import Faqs from "@/components/faqs/Faqs";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";
export const metadata = {
  title: "Essai Gratuit Prospection Automatisée avec ScaleLeads",
  description:
    "Besoin d’infos ou envie de tester ? Contactez notre outil lead gen et démarrez votre essai gratuit prospection automatisée avec ScaleLeads dès maintenant.",
  keywords: [
    "essai gratuit prospection automatisée",
    "contact outil lead gen",
    "démarrer essai gratuit prospection",

    
  ],
  openGraph: {
    title: "Essai Gratuit Prospection Automatisée avec ScaleLeads",
    description:
      "Besoin d’infos ou envie de tester ? Contactez notre outil lead gen et démarrez votre essai gratuit prospection automatisée avec ScaleLeads dès maintenant.",
    url: "https://scaleleads.fr/contact",
    siteName: "ScaleLeads",
    images: [
      {
        url: "https://scaleleads.fr/logo.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Blog Prospection B2B - ScaleLeads",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleleads.fr/contact",
  },
};
const Contact = () => {
  return (
    <div className="page-contact">
      <Container fluid="xl" className="sec-padding text-center">
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
