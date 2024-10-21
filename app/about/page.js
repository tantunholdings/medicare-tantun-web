import Navbar from "@/components/Navbar";
import AboutUsHero from "../../components/AboutUsHero";
import HowWeHelp from "../../components/HowWeHelp";
import WhyChooseUs from "../../components/WhyChooseUs";
import Disclaimer from "../../components/Disclaimer";
export default function About() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 px-6  min-h-screen">
      <AboutUsHero />
      <HowWeHelp />
      <WhyChooseUs />
      </div>
      <Disclaimer />
    </>
  );
}
