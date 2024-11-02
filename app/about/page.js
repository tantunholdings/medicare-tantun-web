import AboutUsHero from "../../components/AboutUsHero";
import HowWeHelp from "../../components/HowWeHelp";
import WhyChooseUs from "../../components/WhyChooseUs";

export default function About() {
  return (
    <>
      <div className="container mx-auto my-8 px-6  min-h-screen">
      <AboutUsHero />
      <HowWeHelp />
      <WhyChooseUs />
      </div>
      
    </>
  );
}
