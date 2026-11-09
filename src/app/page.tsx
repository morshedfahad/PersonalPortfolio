import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Skills } from "@/components/Skills";
import { Pipeline } from "@/components/Pipeline";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <About />
      <Journey />
      <Projects />
      <Experience />
      <Research />
      <Skills />
      <Pipeline />
      <Credentials />
      <Contact />
      <BackToTop />
    </main>
  );
}
