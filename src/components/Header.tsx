"use client";

import { Button } from "@/components/ui/button";
import { Menu, Shield, Users, Headphones, Star, Phone, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      name: "International Tours",
      submenu: [
        { name: "Europe Packages", href: "#" },
        { name: "Southeast Asia", href: "#" },
        { name: "Middle East", href: "#" },
      ],
    },
    {
      name: "India Tours",
      submenu: [
        { name: "Himalayan Getaways", href: "#" },
        { name: "Beach Vacations", href: "#" },
        { name: "Cultural Tours", href: "#" },
      ],
    },
    {
      name: "Trekking",
      submenu: [
        { name: "Beginner Treks", href: "#" },
        { name: "Advanced Expeditions", href: "#" },
        { name: "Pilgrimage Treks", href: "#" },
      ],
    },
  ];

  const trustItems = [
    { icon: Star, text: "4.9 Rating", color: "text-yellow-300" },
    { icon: Shield, text: "100% Customized", color: "text-blue-200" },
    { icon: Users, text: "5000+ Travelers", color: "text-green-200" },
    { icon: Headphones, text: "24/7 Support", color: "text-pink-200" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? "shadow-md" : ""}`}>
      {/* Trust indicators ribbon with animation */}
      <motion.div 
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs lg:text-sm">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <item.icon className={`w-4 h-4 ${item.color} ${item.icon === Star ? "fill-current" : ""}`} />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main header with glass morphism effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`backdrop-blur-lg bg-white/90 ${isScrolled ? "border-b border-gray-200" : ""}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with hover animation */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <img 
                src="/logo.png" 
                alt="logo" 
                className="w-20 h-20 transition-all duration-300 hover:rotate-3"
              />
            </motion.div>

            {/* Navigation - Desktop with dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button
                    whileHover={{ color: "#2563eb" }}
                    className="flex items-center px-4 py-2 text-gray-700 font-medium text-sm transition-colors duration-200"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === index ? "rotate-180" : ""}`} />
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-10"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8979396413</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm" 
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <span className="relative z-10">Pay Now</span>
                  <motion.span
                    initial={{ x: -100, opacity: 0 }}
                    animate={isHovering ? { x: 0, opacity: 0.1 } : { x: 100, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-white/20"
                    onHoverStart={() => setIsHovering(true)}
                    onHoverEnd={() => setIsHovering(false)}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden mobile-menu-container"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4">
                {/* Mobile Navigation Items */}
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0">
                      <div className="py-3">
                        <div className="font-medium text-gray-800 mb-2">{item.name}</div>
                        <div className="space-y-1 ml-4">
                          {item.submenu.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="block py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2 text-sm text-gray-600 mb-4 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-blue-100 transition-all duration-300 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">+91 8979396413</span>
                  </motion.div>
                  
                  <Button 
                    size="sm" 
                    className="p-5 h-5 mb-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-105 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;