import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import IntegratedTechnologies from "./IntegratedTechnologies";
import WhyCryptobute from "./WhyCryptoBute";
import LandingFooter from "./LandingFooter";
const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <IntegratedTechnologies />
      <WhyCryptobute/>
      <LandingFooter/>
    </div>
  );
};

export default Landing;
