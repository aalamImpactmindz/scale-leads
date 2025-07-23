import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <div className="page-content sec-padding">
      <Container fluid="xl">
        <Heading title="Privacy Policy" />

        <h2 className="mt-4">Politique de Confidentialité – ScaleLeads</h2>
        <p><strong>Dernière mise à jour :</strong> Juillet 2025</p>
        <p>
          Chez ScaleLeads, nous attachons une grande importance à la confidentialité et à la sécurité de vos données.
          Cette politique décrit comment nous collectons, utilisons, stockons et partageons les informations des utilisateurs.
        </p>

        <h3 className="mt-4">1. Informations que nous collectons</h3>
        <ul>
          <li>Données personnelles : nom, prénom, adresse email, photo de profil (si autorisé).</li>
          <li>Accès à LinkedIn : token d’accès pour envoyer des messages ou des demandes de connexion automatisées (avec votre consentement explicite).</li>
          <li>Accès Email (Gmail, Outlook) : token OAuth pour envoyer des emails automatisés depuis votre propre messagerie, jamais stocké de façon brute.</li>
          <li>Statistiques d’usage : informations sur l’ouverture des messages, clics, réponse, etc.</li>
        </ul>

        <h3 className="mt-4">2. Comment nous utilisons vos données</h3>
        <p>Vos données sont utilisées exclusivement pour :</p>
        <ul>
          <li>L’exécution des campagnes de prospection automatisée (LinkedIn + Email)</li>
          <li>Le suivi et l’affichage des statistiques dans le dashboard</li>
          <li>L’amélioration continue de notre produit</li>
        </ul>
        <p>Nous ne vendons, ne louons et ne partageons jamais vos données à des tiers sans votre consentement explicite.</p>

        <h3 className="mt-4">3. Stockage et sécurité</h3>
        <ul>
          <li>Les données sont hébergées sur des serveurs sécurisés (AWS)</li>
          <li>L’authentification via Google et Microsoft utilise le protocole OAuth2</li>
          <li>Aucun mot de passe n’est stocké en clair</li>
          <li>Nous utilisons HTTPS sur l’ensemble du site</li>
        </ul>

        <h3 className="mt-4">4. Partage des données</h3>
        <p>Nous ne partageons aucune donnée personnelle avec des tiers, sauf en cas d’obligation légale.</p>

        <h3 className="mt-4">5. Vos droits</h3>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li>Droit d’accès, de rectification et de suppression de vos données</li>
          <li>Droit d’opposition et de retrait du consentement</li>
          <li>Droit à la portabilité des données</li>
        </ul>
        <p>Vous pouvez nous contacter à tout moment à <a href="mailto:support@scaleleads.fr">support@scaleleads.fr</a> pour exercer vos droits.</p>

        <h3 className="mt-4">6. Cookies</h3>
        <p>
          Nous utilisons des cookies fonctionnels et analytiques uniquement pour améliorer l’expérience utilisateur.
          Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
        </p>

        <h3 className="mt-4">7. Contact</h3>
        <p>
          Pour toute question concernant cette politique, contactez-nous à :
        </p>
        <p>
          <strong>ScaleLeads</strong><br />
          Email : <a href="mailto:contact@scaleleads.fr">contact@scaleleads.fr</a><br />
          Site : <a href="https://scaleleads.fr" target="_blank" rel="noopener noreferrer">https://scaleleads.fr</a>
        </p>

   
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
