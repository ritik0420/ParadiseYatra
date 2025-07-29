"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat">
      {/* High-quality background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg leading-tight"
          >
            Discover Your
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block gradient-text"
            >
              Perfect Journey
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95 text-shadow max-w-3xl mx-auto leading-relaxed"
          >
            Experience the world's most breathtaking destinations with our curated travel experiences
          </motion.p>
        </motion.div>
        
        {/* Search bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-2xl border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex-1 relative"
            >
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Where do you want to go?" 
                className="pl-10 border-0 bg-transparent text-gray-800 focus-visible:ring-0 flex-1 placeholder-gray-500 text-lg"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex-1 relative"
            >
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="When?" 
                className="pl-10 border-0 bg-transparent text-gray-800 focus-visible:ring-0 flex-1 placeholder-gray-500"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="flex-1 relative"
            >
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Travelers" 
                className="pl-10 border-0 bg-transparent text-gray-800 focus-visible:ring-0 flex-1 placeholder-gray-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Popular destinations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-sm"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="text-white/80"
          >
            Popular:
          </motion.span>
          {['Bali', 'Thailand', 'Europe', 'Dubai', 'Singapore'].map((dest, index) => (
            <motion.button
            key={dest}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}
            whileHover={{
              scale: 0.95,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium cursor-pointer"
          >
            {dest}
          </motion.button>
          
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;