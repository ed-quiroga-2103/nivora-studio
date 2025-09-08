import React from "react";
import Separator from "@/components/Separator"; // Basic
import HeroSection from "./HeroSection";
import Services from "./Services";
import OurWork from "./OurWork";
import Contact from "./Contact";
// import { motion } from "framer-motion";

// <motion.div
//       className="container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       style={{ padding: "2rem", fontSize: "2rem" }}
//     >
//       <h1>Test</h1>
//       <h2>Test</h2>
//       <h3>Test</h3>

//       <p>Hello from Framer Motion in App Router!</p>
//     </motion.div>

export default function Landing() {
  return (
    <div>
      <HeroSection />
      <Services />
      <OurWork />
      <Contact />
      <Separator />
    </div>
  );
}
