"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HeroSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Custom Input for DatePicker to match other fields
  const CustomDateInput = forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder }, ref) => (
    <Input
      ref={ref}
      onClick={onClick}
      value={value}
      readOnly
      placeholder={placeholder}
      className="w-full pl-8 md:pl-12 border-0 bg-transparent text-gray-800 focus-visible:ring-0 placeholder-gray-500 text-base md:text-lg py-3 md:py-4 cursor-pointer"
    />
  ));
  CustomDateInput.displayName = "CustomDateInput";

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Image background */}
      <img src="https://wallpapercave.com/wp/wp10918600.jpg" alt="hero" className="absolute inset-0 w-full h-full object-cover z-0" />
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-700/40 to-blue-900/70 animate-gradient-x z-10" />
      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Trust badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur">
            <Star className="w-4 h-4 text-yellow-300" />
            Trusted by 5000+ travelers
          </span>
        </div>
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-200 animate-bounce" />
            Your Next Adventure Awaits
          </span>
        </motion.h1>
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-6 opacity-95 max-w-2xl mx-auto"
        >
          Unforgettable journeys, handpicked for you. Explore, dream, and discover with Paradise Yatra.
        </motion.p>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 w-full max-w-2xl mx-auto"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 hover:from-yellow-500 hover:to-pink-600 hover:cursor-pointer hover:scale-105 text-white font-bold px-8 py-4 rounded-xl shadow-xl text-lg transition-all duration-200"
          >
            Plan My Trip
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:cursor-pointer hover:scale-105 font-semibold px-8 py-4 rounded-xl text-lg"
          >
            See Popular Packages
          </Button>
        </motion.div>
        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-8 max-w-4xl mx-auto shadow-2xl border border-white/30"
        >
          <div className="flex flex-col lg:flex-row gap-3 md:gap-6 w-full">
            {/* Destination input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex-[2] min-w-0 relative w-full mb-3 lg:mb-0"
            >
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <Input
                placeholder="Where do you want to go?"
                className="w-full pl-8 md:pl-12 border-0 bg-transparent text-gray-800 focus-visible:ring-0 placeholder-gray-500 text-base md:text-lg py-3 md:py-4"
              />
            </motion.div>
            {/* Date input with DatePicker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex-[2] min-w-0 relative w-full mb-3 lg:mb-0"
            >
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
              <div className="w-full">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  placeholderText="When?"
                  customInput={<CustomDateInput />}
                  calendarClassName="!z-50"
                  popperPlacement="bottom"
                />
              </div>
            </motion.div>
            {/* Travelers input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex-[2] min-w-0 relative w-full mb-3 lg:mb-0"
            >
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <Input
                placeholder="Travelers"
                className="w-full pl-8 md:pl-12 border-0 bg-transparent text-gray-800 focus-visible:ring-0 placeholder-gray-500 text-base md:text-lg py-3 md:py-4"
              />
            </motion.div>
            {/* Search button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-[1] min-w-[120px] flex items-center w-full"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-200 shadow-lg text-base md:text-lg w-full"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Search
              </Button>
            </motion.div>
          </div>
        </motion.div>
        {/* Popular destinations (as before) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-wrap justify-center gap-4 text-sm"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="text-white/80"
          >
            Popular:
          </motion.span>
          {["Bali", "Thailand", "Europe", "Dubai", "Singapore"].map((dest, index) => (
            <motion.button
              key={dest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
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