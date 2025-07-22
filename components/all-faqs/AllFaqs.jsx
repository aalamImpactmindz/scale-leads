"use client";
import React from "react";
import { Accordion } from "react-bootstrap";

const AllFaqs = () => {
  return (
    <Accordion>
      <Accordion.Item
        eventKey="0"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>Comment l’IA génère-t-elle des designs ?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
           Notre IA analyse votre dossier de conception et utilise des algorithmes avancés pour
          générez plusieurs concepts de conception adaptés à vos spécifications. Il
          prend en compte vos préférences, votre style et les exigences de votre projet
          pour offrir des designs uniques et de haute qualité. Notre IA analyse votre dossier de conception et utilise des algorithmes avancés pour
          générez plusieurs concepts de conception adaptés à vos spécifications. Il
          prend en compte vos préférences, votre style et les exigences de votre projet
          pour offrir des designs uniques et de haute qualité.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="1"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>
          Puis-je personnaliser les conceptions générées par l’IA ?
        </Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
         Oui, notre plateforme comprend de puissants outils de personnalisation qui vous permettent
          pour affiner et perfectionner les designs que vous avez choisis. Vous pouvez faire des ajustements,
          ajoutez des éléments et modifiez les détails pour garantir que la conception finale correspond
          votre vision.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="2"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>Quelles options de support sont disponibles ?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Nous offrons un soutien complet pour tous nos plans. Les utilisateurs de démarrage ont accès à l'assistance par e-mail, les utilisateurs Pro bénéficient d'un e-mail prioritaire assistance, et les utilisateurs d'Enterprise reçoivent une assistance prioritaire 24h/24 et 7j/7 un gestionnaire de compte dédié.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="3"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>Existe-t-il un essai gratuit disponible ?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
         Oui, nous offrons un essai gratuit de 14 jours pour tous les nouveaux utilisateurs. Vous pouvez explorer
          toutes les fonctionnalités de notre assistant de conception alimenté par l'IA et voyez comment il peut
          améliorez votre processus créatif avant de vous engager dans un abonnement.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="4"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>Dans quelle mesure mes données sont-elles sécurisées ?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Nous privilégions la sécurité de vos données. Toutes vos conceptions et projets les détails sont stockés dans un stockage cloud sécurisé avec un cryptage avancé. Les utilisateurs d'entreprise ont accès à des options de sécurité améliorées pour plus de tranquillité d'esprit.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item
        eventKey="5"
        className="bg-transparent border-0 rounded-0"
      >
        <Accordion.Header>Quelles intégrations sont disponibles ?</Accordion.Header>
        <Accordion.Body className="color-text p-0 pb-3 small">
          Notre plateforme s'intègre parfaitement à la conception et au projet populaires outils de gestion tels qu'Adobe Creative Suite, Figma et Trello. Cette vous permet de rationaliser votre flux de travail et d'intégrer facilement notre Assistant de conception basé sur l'IA dans vos processus existants.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AllFaqs;
