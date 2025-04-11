import ContinuousSlider from "@/components/continuous-slider/ContinuousSlider";
import Hero from "@/components/hero/Hero";
import Working from "@/components/working/Working";
import Plans from "@/components/plans/Plans";
import Faqs from "@/components/faqs/Faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <ContinuousSlider />
      <Working />
      <Plans />
      <Faqs />
    </>
  );
}
