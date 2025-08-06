"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import OptimizedImage from "@/components/ui/optimized-image";

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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Multiple fallback images for better reliability - using more reliable Unsplash URLs
  const fallbackImages = [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];
  
  // Use fallback if image is empty, undefined, or failed to load
  const displayImage = (!coverImage || coverImage === "" || imageError) ? fallbackImages[0] : coverImage;
  
  // Ensure we have a valid image URL
  const finalImage = displayImage.startsWith('http') ? displayImage : fallbackImages[0];

  // Debug logging
  useEffect(() => {
    console.log('PackageHeader - coverImage:', coverImage);
    console.log('PackageHeader - displayImage:', displayImage);
    console.log('PackageHeader - finalImage:', finalImage);
    console.log('PackageHeader - imageError:', imageError);
  }, [coverImage, displayImage, finalImage, imageError]);

  const handleImageError = () => {
    console.log('PackageHeader - Image failed to load:', finalImage);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('PackageHeader - Image loaded successfully:', finalImage);
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <section className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <OptimizedImage 
        src={finalImage} 
        alt={title}
        className="w-full h-full object-cover"
        fallbackSrc={fallbackImages[1]}
        fill={true}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="absolute inset-0 container mx-auto px-4 h-full flex items-center">
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