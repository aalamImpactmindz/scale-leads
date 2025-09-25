
import Heading from "@/components/heading/Heading";
import React from "react";
import { Container } from "react-bootstrap";
export const metadata  ={
  title: "Politique de confidentialité ScaleLeads | Confidentialité",
  description:
    "La politique de confidentialité ScaleLeads assure la confidentialité données utilisateurs et la protection des données personnelles en toute transparence.",
      keywords: [
    "politique de confidentialité ScaleLeads",
    "articles sur cold email",
    "guide prospection automatisée",
    "contenu génération de leads",
    
  ],
  openGraph: {
     title: "Politique de confidentialité ScaleLeads | Confidentialité",
  description:
    "La politique de confidentialité ScaleLeads assure la confidentialité données utilisateurs et la protection des données personnelles en toute transparence.",
    url: "https://scaleleads.fr/privacy",
    siteName: "ScaleLeads",
    images: [
      {
        url: "https://scaleleads.fr/logo.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Politique de confidentialité ScaleLeads",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleleads.fr/privacy",
  },
}
const PrivacyPolicy = () => {
  return (
    <div className="page-content sec-padding">
      <Container fluid="xl">
        <Heading title="Politique de confidentialité de ScaleLead" />
        <p>
          Chez <strong>ScaleLead</strong>, nous attachons une grande importance à la protection de vos données personnelles.
          Cette politique décrit les types de données que nous collectons, leur utilisation et les mesures prises pour
          garantir leur sécurité.
        </p>

        <h4>1. Données collectées</h4>
        <p>
          Nous collectons uniquement le cookie de session LinkedIn <code>li_at</code>, avec votre consentement explicite,
          afin d'authentifier votre session et permettre la synchronisation de vos contacts LinkedIn avec notre CRM.
          Aucune autre donnée personnelle n’est collectée ou stockée.
        </p>

        <h4>2. Utilisation des données</h4>
        <p>
          Le cookie <code>li_at</code> est utilisé exclusivement pour synchroniser vos contacts LinkedIn avec ScaleLead.
          Nous ne collectons pas de données à des fins de publicité, de suivi ou d’analyse.
        </p>

        <h4>3. Stockage et sécurité</h4>
        <p>
          Nous ne stockons pas le cookie <code>li_at</code> sur nos serveurs. Toutes les communications sont chiffrées
          via HTTPS et respectent les meilleures pratiques de sécurité.
        </p>

        <h4>4. Partage de données</h4>
        <p>
          Aucune donnée n’est partagée avec des tiers, partenaires ou annonceurs. Vos données restent confidentielles.
        </p>

        <h4>5. Consentement de l'utilisateur</h4>
        <p>
          En utilisant notre extension Chrome, vous consentez à l’utilisation du cookie <code>li_at</code> dans le
          but unique de synchronisation avec ScaleLead CRM. Vous pouvez révoquer ce consentement à tout moment
          en désinstallant l’extension.
        </p>

        <h4>6. Vos droits</h4>
        <p>
          Conformément au RGPD, vous avez le droit d’accéder, de corriger ou de supprimer vos données personnelles.
          Pour toute demande, contactez-nous via l’adresse ci-dessous.
        </p>

        <h4>7. Contact</h4>
        <p>
          Pour toute question concernant cette politique de confidentialité :<br />
          📧 <a href="mailto:support@scaleleads.fr">support@scaleleads.fr</a><br />
          🌐 <a href="https://scaleleads.fr">https://scaleleads.fr</a>
        </p>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
