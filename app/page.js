import Hero from "@/components/hero/Hero";
import Plans from "@/components/plans/Plans";
import SuccessStories from "@/components/success-stories/SuccessStories";
import WalkThrough from "@/components/walkthrough/WalkThrough";
import Problem from "@/components/problem/Problem";
import Solution from "@/components/solution/Solution";

export default function Home() {
  return (
    <div className="page-home">
      <Hero />
      <Problem />
      <Solution />
      <WalkThrough />
      <Plans customClass="pt-0" />
      <SuccessStories customClass="pt-0" />
    </div>
  );
}
