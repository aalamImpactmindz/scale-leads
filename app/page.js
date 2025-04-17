import ContinuousSlider from "@/components/continuous-slider/ContinuousSlider";
import Hero from "@/components/hero/Hero";
import Working from "@/components/working/Working";
import Plans from "@/components/plans/Plans";
import Faqs from "@/components/faqs/Faqs";
import SuccessStories from "@/components/success-stories/SuccessStories";
import { Button } from "react-bootstrap";
import Link from "next/link";
import WalkThrough from "@/components/walkthrough/WalkThrough";

export default function Home() {
  return (
    <div className="page-home">
      <Link href="/abonnement" passHref className="position-fixed">
        <Button className="btn-main w-100">Démarrer</Button>
      </Link>
      <Hero />
      <ContinuousSlider />
      <Working />
      <Plans />
      <WalkThrough />
      <SuccessStories />
      <Faqs />
    </div>
  );
}
