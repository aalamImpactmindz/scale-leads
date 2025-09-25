import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Tarif Automatisation Prospection | Plans ScaleLeads",
  description:
    "Découvrez les prix outil prospection et choisissez l’abonnement génération de leads qui correspond à vos objectifs B2B. Des plans simples et efficaces.",
  keywords: [
    "tarif automatisation prospection",
    "prix outil prospection",
    "abonnement génération de leads",
    "tarif automatisation prospection",
    
  ],
  openGraph: {
     title: "Tarif Automatisation Prospection | Plans ScaleLeads",
    description:
      "Découvrez les prix outil prospection et choisissez l’abonnement génération de leads qui correspond à vos objectifs B2B. Des plans simples et efficaces.",
    url: "https://scaleleads.fr/abonnement",
    siteName: "ScaleLeads",
    images: [
      {
        url: "https://scaleleads.fr/logo.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Tarif Automatisation Prospection | Plans ScaleLeads",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleleads.fr/abonnement",
  },
};

export default function SiteLayout({ children }) {
  return (
    <>
     <ToastContainer toastStyle={{ width: '430px' }} />
   
      {children}
    
    </>
  );
}
