"use client";

import { createLazyComponent } from "./ui/lazy-wrapper";
import Loading from "./ui/loading";

// Lazy load all components with consistent loading states
export const LazyHeader = createLazyComponent(
  () => import("./Header"),
  <Loading size="lg" className="min-h-[80px]" />
);

export const LazyHeroSection = createLazyComponent(
  () => import("./HeroSection"),
  <Loading size="lg" className="min-h-[600px]" />
);

export const LazyTrendingDestinations = createLazyComponent(
  () => import("./TrendingDestinations"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyRecentlyBooked = createLazyComponent(
  () => import("./RecentlyBooked"),
  <Loading size="lg" className="min-h-[300px]" />
);

export const LazyHolidaysSection = createLazyComponent(
  () => import("./HolidaysSection"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyDestinationsGrid = createLazyComponent(
  () => import("./DestinationsGrid"),
  <Loading size="lg" className="min-h-[500px]" />
);

export const LazyPremiumPackages = createLazyComponent(
  () => import("./PremiumPackages"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdventureEscapes = createLazyComponent(
  () => import("./AdventureEscapes"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyBlogSection = createLazyComponent(
  () => import("./BlogSection"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyTestimonialSection = createLazyComponent(
  () => import("./TestimonialSection"),
  <Loading size="lg" className="min-h-[300px]" />
);

export const LazyCTASection = createLazyComponent(
  () => import("./CTASection"),
  <Loading size="lg" className="min-h-[200px]" />
);

export const LazyFooter = createLazyComponent(
  () => import("./Footer"),
  <Loading size="lg" className="min-h-[300px]" />
); 