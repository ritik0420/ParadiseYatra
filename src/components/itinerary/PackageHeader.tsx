"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Star, Users } from "lucide-react";

interface PackageHeaderProps {
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  rating: string;
  totalBookings: number;
  coverImage: string;
}

const PackageHeader = ({ 
  title, 
  subtitle, 
  duration, 
  location, 
  rating, 
  totalBookings, 
  coverImage 
}: PackageHeaderProps) => {
  return (
    <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-6"
          >
            {subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 text-sm"
          >
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span>{rating} Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>{totalBookings} Bookings</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackageHeader; 