"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminBlogs from "@/components/admin/AdminBlogs";
import AdminSEO from "@/components/admin/AdminSEO";
import AdminMenu from "@/components/admin/AdminMenu";
import AdminTrendingDestinations from "@/components/admin/AdminTrendingDestinations";
import AdminRecentlyBooked from "@/components/admin/AdminRecentlyBooked";
import AdminPremiumPackages from "@/components/admin/AdminPremiumPackages";
import AdminAdventurePackages from "@/components/admin/AdminAdventurePackages";

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
        return <AdminDashboard />;
      case "menu":
        return <AdminMenu />;
      case "packages":
        return <AdminPackages />;
      case "seo":
        return <AdminSEO />;
      case "blogs":
        return <AdminBlogs initialAction={blogAction} onActionComplete={() => setBlogAction(null)} />;
      case "trending-destinations":
        return <AdminTrendingDestinations />;
      case "recently-booked":
        return <AdminRecentlyBooked />;
      case "premium-packages":
        return <AdminPremiumPackages />;
      case "adventure-packages":
        return <AdminAdventurePackages />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
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