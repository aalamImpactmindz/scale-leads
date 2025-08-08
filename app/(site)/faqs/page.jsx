import AllFaqs from "@/components/all-faqs/AllFaqs";
import "./faqs.css";
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";

const Faqs = () => {
  return (
    <div className="page-faqs sec-padding">
      <Container fluid="xl">
        <Heading
          title="Questions fréquemment posées"
          highlightedWords={["Questions"]}
          description="Vous avez des questions sur notre assistant de conception basé sur l’IA ? Trouvez des réponses aux questions les plus courantes et découvrez comment notre plateforme peut améliorer votre processus créatif."
        />
        <AllFaqs />
      </Container>
    </div>
  );
};

export default Faqs;
