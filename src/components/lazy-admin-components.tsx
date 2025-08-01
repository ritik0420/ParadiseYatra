"use client";

import { createLazyComponent } from "./ui/lazy-wrapper";
import Loading from "./ui/loading";

// Lazy load all admin components with consistent loading states
export const LazyAdminSidebar = createLazyComponent(
  () => import("./admin/AdminSidebar"),
  <Loading size="lg" className="min-h-[100vh]" />
);

export const LazyAdminDashboard = createLazyComponent(
  () => import("./admin/AdminDashboard"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminPackages = createLazyComponent(
  () => import("./admin/AdminPackages"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminBlogs = createLazyComponent(
  () => import("./admin/AdminBlogs"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminSEO = createLazyComponent(
  () => import("./admin/AdminSEO"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminMenu = createLazyComponent(
  () => import("./admin/AdminMenu"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminTrendingDestinations = createLazyComponent(
  () => import("./admin/AdminTrendingDestinations"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminRecentlyBooked = createLazyComponent(
  () => import("./admin/AdminRecentlyBooked"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminPremiumPackages = createLazyComponent(
  () => import("./admin/AdminPremiumPackages"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminAdventurePackages = createLazyComponent(
  () => import("./admin/AdminAdventurePackages"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminHeroSection = createLazyComponent(
  () => import("./admin/AdminHeroSection"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminHeader = createLazyComponent(
  () => import("./admin/AdminHeader"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminFooter = createLazyComponent(
  () => import("./admin/AdminFooter"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminTestimonials = createLazyComponent(
  () => import("./admin/AdminTestimonials"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminCTASection = createLazyComponent(
  () => import("./admin/AdminCTASection"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminStats = createLazyComponent(
  () => import("./admin/AdminStats"),
  <Loading size="lg" className="min-h-[400px]" />
);

export const LazyAdminItinerary = createLazyComponent(
  () => import("./admin/AdminItinerary"),
  <Loading size="lg" className="min-h-[400px]" />
); 