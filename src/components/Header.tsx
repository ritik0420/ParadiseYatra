"use client";

import { Button } from "@/components/ui/button";
import { Menu, Shield, Users, Headphones, Star, Phone, ChevronDown, X, MapPin, Calendar, Search, Globe, Mountain, Heart, Plane, Waves, Mountain as MountainIcon, Building, TreePine, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LeadCaptureForm from "./LeadCaptureForm";
import SearchSuggestions from "./SearchSuggestions";
import { useRouter } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const router = useRouter();
  
  // Use the custom hook for dynamic navigation
  const { navItems, loading, error } = useNavigation();

  // Icon mapping for dynamic navigation
  const iconMap: { [key: string]: any } = {
    Globe,
    MapPin,
    Mountain,
    Calendar,
    Search,
    Star,
    Heart
  };

  // Function to get destination-specific icon
  const getDestinationIcon = (destination: string) => {
    const lowerDest = destination.toLowerCase();
    
    if (lowerDest.includes('beach') || lowerDest.includes('coastal') || lowerDest.includes('island')) {
      return Waves;
    }
    if (lowerDest.includes('mountain') || lowerDest.includes('himalaya') || lowerDest.includes('trek')) {
      return MountainIcon;
    }
    if (lowerDest.includes('city') || lowerDest.includes('urban') || lowerDest.includes('metropolitan')) {
      return Building;
    }
    if (lowerDest.includes('forest') || lowerDest.includes('wildlife') || lowerDest.includes('jungle')) {
      return TreePine;
    }
    if (lowerDest.includes('cultural') || lowerDest.includes('heritage') || lowerDest.includes('temple')) {
      return Camera;
    }
    if (lowerDest.includes('adventure') || lowerDest.includes('sport') || lowerDest.includes('activity')) {
      return Plane;
    }
    
    // Default icon
    return MapPin;
  };

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const trustItems = [
    { icon: Star, text: "4.9★", color: "text-yellow-400" },
    { icon: Shield, text: "100% Safe", color: "text-blue-200" },
    { icon: Users, text: "5000+", color: "text-cyan-500" },
    { icon: Headphones, text: "24/7", color: "text-amber-500" },
  ];

  const handleSearchSelect = (suggestion: any) => {
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    // Navigate to the itinerary page
    router.push(`/itinerary/${suggestion.slug}`);
  };

  const handleSearchClose = () => {
    // setIsSearchOpen(false); // This line is removed as per the edit hint
  };

  // Show loading state or fallback navigation if data is not available
  if (loading) {
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

        {/* Main header with loading state */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/95 backdrop-blur-xl border-b border-gray-100/50"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
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

              {/* Loading navigation */}
              <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-28"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-36"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </nav>

              {/* Right side */}
              <div className="hidden lg:flex items-center space-x-4 !flex-shrink-0 ">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  <Phone className="w-4 h-4 " />
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

              {/* Mobile menu button */}
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
        </motion.div>

        {/* Lead Capture Form */}
        <LeadCaptureForm
          isOpen={isLeadFormOpen}
          onClose={() => setIsLeadFormOpen(false)}
        />
      </header>
    );
  }

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
          <div className="flex items-center h-16 lg:h-20">
            {/* Logo - Left side */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center flex-shrink-0 w-40 -ml-2"
            >
              <img 
                src="/headerLogo.png" 
                alt="Paradise Yatra" 
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              />
            </motion.div>

            {/* Navigation - Desktop - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-6">
                {navItems.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <div 
                      key={index}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.button
                        whileHover={{ color: "#2563eb" }}
                        className="flex items-center px-3 py-2 text-gray-700 font-medium text-sm rounded-lg hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
                      >
                        {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                        {item.name}
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === index ? "rotate-180" : ""}`} />
                      </motion.button>

                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.5 }}
                          className="absolute left-0 top-full mt-1 w-64 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100 z-20 overflow-hidden"
                        >
                                                  {item.submenu.map((subItem, subIndex) => {
                          const DestinationIcon = getDestinationIcon(subItem.name);
                          return (
                            <a
                              key={subIndex}
                              href={subItem.href}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 border-l-4 border-transparent hover:border-blue-500"
                            >
                              <DestinationIcon className="w-4 h-4 mr-3 text-blue-500" />
                              <span className="flex-1">{subItem.name}</span>
                              {subItem.featured && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  <Star className="w-3 h-3 text-yellow-500 ml-2" />
                                </motion.div>
                              )}
                            </a>
                          );
                        })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              </div>
            </nav>

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 w-40 justify-end ml-50 ">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 cursor-pointer px-2 py-2 rounded-lg hover:bg-blue-50"
              >
                <Phone className="w-4 h-4" />
                <span className="whitespace-nowrap">+91 8979396413</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setIsLeadFormOpen(true)}
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-lg whitespace-nowrap"
                >
                  Book Now
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button - Right side */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden mobile-menu-container ml-auto flex-shrink-0 w-12"
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
              <div className="container !mt-4 px-4 sm:px-6 py-6">
                {/* Mobile Navigation Items */}
                <nav className="space-y-4 mb-6">
                  {navItems.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="border border-gray-100 rounded-lg p-4  bg-gradient-to-r from-gray-50 to-blue-50"
                      >
                        <div className="flex items-center mb-3">
                          {IconComponent && <IconComponent className="w-5 h-5 text-blue-600 mr-3" />}
                          <div className="font-semibold text-gray-800">{item.name}</div>
                        </div>
                        <div className="space-y-2">
                          {item.submenu.map((subItem, subIndex) => {
                            const DestinationIcon = getDestinationIcon(subItem.name);
                            return (
                              <motion.a
                                key={subIndex}
                                href={subItem.href}
                                whileHover={{ x: 5 }}
                                className="flex items-center py-2 px-3 text-sm text-gray-600 rounded-lg hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <DestinationIcon className="w-4 h-4 !mt-2 mr-3 text-blue-500" />
                                <span className="flex-1">{subItem.name}</span>
                                {subItem.featured && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <Star className="w-3 h-3 text-yellow-500 ml-2" />
                                  </motion.div>
                                )}
                              </motion.a>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
                  >
                    <Phone className="w-4 h-4 text-blue-600 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500">Call us anytime</div>
                      <div className="font-semibold text-gray-800">+91 8979396413</div>
                    </div>
                  </motion.div>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4 mb-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
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