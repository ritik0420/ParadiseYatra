"use client";

import { Button } from "@/components/ui/button";
import { Menu, Shield, Users, Headphones, Star, Phone, ChevronDown, X, MapPin, Calendar, Search, Globe, Mountain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LeadCaptureForm from "./LeadCaptureForm";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

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
      name: "Premium Packages",
      icon: Globe,
      submenu: [
        { name: "Europe Packages", href: "#" },
        { name: "Southeast Asia", href: "#" },
        { name: "Middle East", href: "#" }, 
      ],
    },
    {
      name: "Adventure Escapes",
      icon: MapPin,
      submenu: [
        { name: "Himalayan Getaways", href: "#" },
        { name: "Beach Vacations", href: "#" },
        { name: "Cultural Tours", href: "#" },
        { name: "Wildlife Safaris", href: "#" },
      ],
    },
    {
      name: "Holidays",
      icon: Mountain,
      submenu: [
        { name: "Trekking Expeditions", href: "#" },
        { name: "Water Sports", href: "#" },
        { name: "Desert Safaris", href: "#" },
        { name: "Winter Sports", href: "#" },
      ],
    },
  ];

  const trustItems = [
    { icon: Star, text: "4.9★", color: "text-yellow-400" },
    { icon: Shield, text: "100% Safe", color: "text-blue-600" },
    { icon: Users, text: "5000+", color: "text-green-600" },
    { icon: Headphones, text: "24/7", color: "text-purple-600" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Trust indicators ribbon */}
      <motion.div 
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white"
      >
        <div className="container mx-auto px-2 sm:px-4 py-1 sm:py-2">
          <div className="flex items-center justify-center gap-x-2 sm:gap-x-4 lg:gap-x-8 text-xs">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1"
              >
                <item.icon className={`w-3 h-3 ${item.color}`} />
                <span className="font-semibold text-xs whitespace-nowrap">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`bg-white/95 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300 ${
          isScrolled ? "shadow-lg bg-white/98" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Left side */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center flex-shrink-0"
            >
              <img 
                src="/headerLogo.png" 
                alt="Paradise Yatra" 
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              />
            </motion.div>

            {/* Navigation - Desktop - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-8">
              {navItems.map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button
                    whileHover={{ color: "#2563eb" }}
                    className="flex items-center px-3 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
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
                        className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-20"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
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
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8979396413</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setIsLeadFormOpen(true)}
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg"
                >
                  Book Now
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button - Right side */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden mobile-menu-container ml-auto"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-full"
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
              className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200"
            >
              <div className="container mx-auto px-4 sm:px-6 py-6">
                {/* Mobile Search */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search destinations, packages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                    />
                  </div>
                </motion.div>

                {/* Mobile Navigation Items */}
                <nav className="space-y-4 mb-6">
                  {navItems.map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="border border-gray-100 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-blue-50"
                    >
                      <div className="flex items-center mb-3">
                        <item.icon className="w-5 h-5 text-blue-600 mr-3" />
                        <div className="font-semibold text-gray-800">{item.name}</div>
                      </div>
                      <div className="space-y-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.a
                            key={subIndex}
                            href={subItem.href}
                            whileHover={{ x: 5 }}
                            className="block py-2 px-3 text-sm text-gray-600 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
                  >
                    <Phone className="w-4 h-4 text-blue-600 mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">Call us anytime</div>
                      <div className="font-semibold text-gray-800">+91 8979396413</div>
                    </div>
                  </motion.div>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLeadFormOpen(true);
                    }}
                  >
                    Book Your Adventure
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lead Capture Form */}
      <LeadCaptureForm
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
      />
    </header>
  );
};

export default Header;