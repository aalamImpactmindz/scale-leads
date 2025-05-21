import Hero from "@/components/hero/Hero";
import Plans from "@/components/plans/Plans";
import SuccessStories from "@/components/success-stories/SuccessStories";
import WalkThrough from "@/components/walkthrough/WalkThrough";
import Solution from "@/components/solution/Solution";
import Working from "@/components/working/Working";

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
