"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const userStr = localStorage.getItem("adminUser");

      if (!token || !userStr) {
        router.push("/admin/login");
        return;
      }

      try {
        const user = JSON.parse(userStr);
        
        // Check if user is admin
        if (user.role !== "admin") {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          router.push("/admin/login");
          return;
        }

        // Verify token with backend
        const response = await fetch("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          router.push("/admin/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <LazyAdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection as (section: string) => void}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        onLogout={handleLogout}
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