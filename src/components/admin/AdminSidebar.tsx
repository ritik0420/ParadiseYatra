"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  FolderOpen, 
  Settings, 
  FileText, 
  Mountain, 
  Calendar, 
  Star, 
  Compass,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
}

const AdminSidebar = ({ 
  activeSection, 
  setActiveSection, 
  expandedSections, 
  toggleSection 
}: AdminSidebarProps) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      hasSubmenu: false,
      hasNotification: false,
    },
    {
      id: "addons",
      label: "ADDONS",
      icon: null,
      hasSubmenu: false,
      hasNotification: false,
      isHeader: true,
    },
    {
      id: "menu",
      label: "Menu",
      icon: FolderOpen,
      hasSubmenu: false,
      hasNotification: false,
    },
    {
      id: "packages",
      label: "Packages",
      icon: Settings,
      hasSubmenu: false,
      hasNotification: true,
    },
    {
      id: "seo",
      label: "SEO",
      icon: Settings,
      hasSubmenu: false,
      hasNotification: false,
    },
    {
      id: "blogs",
      label: "Blog",
      icon: FileText,
      hasSubmenu: true,
      hasNotification: false,
      subItems: [
        { id: "create-blog", label: "Create Blog" },
        { id: "all-blogs", label: "All Blogs" },
      ],
    },
    {
      id: "trending-destinations",
      label: "Trending Destinations",
      icon: Mountain,
      hasSubmenu: false,
      hasNotification: false,
    },
    {
      id: "recently-booked",
      label: "Recently Booked",
      icon: Calendar,
      hasSubmenu: false,
      hasNotification: false,
    },
    {
      id: "premium-packages",
      label: "Premium Packages",
      icon: Star,
      hasSubmenu: false,
      hasNotification: false,
    },
    {
      id: "adventure-packages",
      label: "Adventure Packages",
      icon: Compass,
      hasSubmenu: false,
      hasNotification: false,
    },
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === "addons") return; // Don't do anything for header
    
    if (menuItems.find(item => item.id === itemId)?.hasSubmenu) {
      toggleSection(itemId);
    } else {
      setActiveSection(itemId);
    }
  };

  return (
    <div className="w-64 p-2 m-2 bg-blue-900 text-white min-h-screen flex flex-col rounded-lg">
      {/* Logo and Title */}
      <div className="p-4 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <div>
            <img src="/logo.png" alt="logo" className="bg-white rounded-full w-25 h-25" />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.isHeader ? (
              <div className="text-blue-300 text-sm font-semibold uppercase tracking-wider py-2">
                {item.label}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span className="font-medium">{item.label}</span>
                    {item.hasNotification && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  {item.hasSubmenu && (
                    <span className="text-sm">
                      {expandedSections.has(item.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </button>

                {/* Submenu for Blog */}
                {item.hasSubmenu && expandedSections.has(item.id) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          setActiveSection("blogs");
                          // Pass the submenu action to the parent component
                          if (subItem.id === "create-blog") {
                            // We'll handle this in the AdminPage component
                            window.dispatchEvent(new CustomEvent('blogAction', { detail: 'create' }));
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          activeSection === "blogs"
                            ? "bg-blue-700 text-white"
                            : "text-gray-300 hover:bg-blue-800 hover:text-white"
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 