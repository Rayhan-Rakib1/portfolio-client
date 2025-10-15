import About from "@/components/modules/Home/About";
import FeaturedProjectsPage from "@/components/modules/Home/FeturedProjects";
import Hero from "@/components/modules/Home/Hero";
import Qualification from "@/components/modules/Home/Qualification";
import Skills from "@/components/modules/Home/Skills";
import ThreeBlog from "@/components/modules/Home/ThreeBlog";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About></About>
      <Skills></Skills>
      <Qualification></Qualification>
      <FeaturedProjectsPage></FeaturedProjectsPage>
      <ThreeBlog></ThreeBlog>
    </div>
  );
}
