"use client";

import { useState, useEffect } from "react";
import {
  LazyAdminSidebar,
  LazyAdminDashboard,
  LazyAdminPackages,
  LazyAdminBlogs,
  LazyAdminSEO,
  LazyAdminMenu,
  LazyAdminTrendingDestinations,
  LazyAdminRecentlyBooked,
  LazyAdminPremiumPackages,
  LazyAdminAdventurePackages,
} from "@/components/lazy-admin-components";

type AdminSection = 
  | "dashboard"
  | "menu"
  | "packages"
  | "seo"
  | "blogs"
  | "trending-destinations"
  | "recently-booked"
  | "premium-packages"
  | "adventure-packages";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["blogs"]));
  const [blogAction, setBlogAction] = useState<string | null>(null);

  useEffect(() => {
    const handleBlogAction = (event: CustomEvent) => {
      setBlogAction(event.detail);
    };

    window.addEventListener('blogAction', handleBlogAction as EventListener);
    
    return () => {
      window.removeEventListener('blogAction', handleBlogAction as EventListener);
    };
  }, []);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <LazyAdminDashboard />;
      case "menu":
        return <LazyAdminMenu />;
      case "packages":
        return <LazyAdminPackages />;
      case "seo":
        return <LazyAdminSEO />;
      case "blogs":
        return <LazyAdminBlogs initialAction={blogAction} onActionComplete={() => setBlogAction(null)} />;
      case "trending-destinations":
        return <LazyAdminTrendingDestinations />;
      case "recently-booked":
        return <LazyAdminRecentlyBooked />;
      case "premium-packages":
        return <LazyAdminPremiumPackages />;
      case "adventure-packages":
        return <LazyAdminAdventurePackages />;
      default:
        return <LazyAdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <LazyAdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection as (section: string) => void}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage; 