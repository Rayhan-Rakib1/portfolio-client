import About from "@/components/modules/Home/About";
import Hero from "@/components/modules/Home/Hero";
import Qualification from "@/components/modules/Home/Qualification";
import Skills from "@/components/modules/Home/Skills";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About></About>
      <Skills></Skills>
      <Qualification></Qualification>
    </div>
  );
}
