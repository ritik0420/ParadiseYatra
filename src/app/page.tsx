"use client";

import { motion } from "framer-motion";
import {
  LazyHeader,
  LazyHeroSection,
  LazyTrendingDestinations,
  LazyRecentlyBooked,
  LazyHolidaysSection,
  LazyDestinationsGrid,
  LazyPremiumPackages,
  LazyAdventureEscapes,
  LazyBlogSection,
  LazyTestimonialSection,
  LazyCTASection,
  LazyFooter,
} from "@/components/lazy-components";

const Index = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <LazyHeader />
      <LazyHeroSection />
      <LazyTrendingDestinations />
      <LazyHolidaysSection />
      <LazyDestinationsGrid />
      <LazyPremiumPackages />
      <LazyAdventureEscapes />
      <LazyBlogSection />
      <LazyTestimonialSection />
      <LazyCTASection />
      <LazyFooter />
    </motion.div>
  );
};

export default Index;
