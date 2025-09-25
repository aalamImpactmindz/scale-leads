import Hero from "@/components/hero/Hero";
import Plans from "@/components/plans/Plans";
import SuccessStories from "@/components/success-stories/SuccessStories";
import WalkThrough from "@/components/walkthrough/WalkThrough";
import Solution from "@/components/solution/Solution";
import Working from "@/components/working/Working";
export const metadata = {
  title: "Automatisation Prospection B2B | Générez Plus de Leads",
  description:
    "Peu de leads ? ScaleLeads est l’outil d’automatisation de prospection LinkedIn idéal pour générer plus de leads B2B qualifiés et développer votre activité.",
  keywords: [
    "automatisation prospection B2B",
    "prospection automatisée",
    "génération de leads B2B",
    "outil prospection LinkedIn",
    
  ],
  openGraph: {
    title: "Automatisation Prospection B2B | Générez Plus de Leads",
    description:
      "Peu de leads ? ScaleLeads est l’outil d’automatisation de prospection LinkedIn idéal pour générer plus de leads B2B qualifiés et développer votre activité.",
    url: "https://scaleleads.fr",
    siteName: "ScaleLeads",
    images: [
      {
        url: "https://scaleleads.fr/logo.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Automatisation Prospection B2B - ScaleLeads",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://scaleleads.fr",
  },
};

export default function Home() {
  return (
    <div className="page-home">
      <Hero />
      <Working customClass="pt-0" />
      <Solution />
      <WalkThrough />
      <Plans customClass="pt-0" />
      <SuccessStories customClass="pt-0" />
    </div>
  );
}
