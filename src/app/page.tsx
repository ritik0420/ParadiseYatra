"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrendingDestinations from "@/components/TrendingDestinations";
import RecentlyBooked from "@/components/RecentlyBooked";
import HolidaysSection from "@/components/HolidaysSection";
import DestinationsGrid from "@/components/DestinationsGrid";
import PremiumPackages from "@/components/PremiumPackages";
import AdventureEscapes from "@/components/AdventureEscapes";
import TestimonialSection from "@/components/TestimonialSection";
import QuoteSection from "@/components/QuoteSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Header />
      <HeroSection />
      <TrendingDestinations />
      <RecentlyBooked />
      <HolidaysSection />
      <DestinationsGrid />
      <PremiumPackages />
      <AdventureEscapes />
      <TestimonialSection />
      <QuoteSection />
      <CTASection />
      <Footer />
    </motion.div>
  );
};

export default Index;
