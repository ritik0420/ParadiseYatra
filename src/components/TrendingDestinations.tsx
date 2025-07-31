"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

function getRatingLabel(rating: number) {
  if (rating >= 4.7) return "Excellent";
  if (rating >= 4.5) return "Great";
  if (rating >= 4.0) return "Good";
  return "Average";
}

const TrendingDestinations = () => {
  const trendingPackages = [
    {
      title: "Royal Rajasthan",
      duration: "5N-6D",
      location: "Rajasthan, India",
      price: "₹70,000",
      originalPrice: "₹76,500",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Trending",
      description: "Experience the grandeur of royal palaces and desert landscapes",
      booked: 1200
    },
    {
      title: "Swiss Alps Adventure",
      duration: "7N-8D",
      location: "Switzerland",
      price: "₹1,25,000",
      originalPrice: "₹1,40,000",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Popular",
      description: "Mountain adventures and scenic train journeys",
      booked: 950
    },
    {
      title: "Bali Paradise",
      duration: "6N-7D",
      location: "Bali, Indonesia",
      price: "₹85,000",
      originalPrice: "₹95,000",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Best Seller",
      description: "Tropical beaches and cultural experiences",
      booked: 1700
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-blue-600 text-base font-semibold tracking-wide mb-2"
          >
            Handpicked for Your Next Adventure
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Trending Packages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-nunito font-light"
          >
            Discover our most popular travel packages, carefully curated for unforgettable experiences
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {trendingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="h-full flex"
            >
              <Card className="group overflow-hidden modern-card hover-lift rounded-3xl shadow-xl border-0 relative bg-gradient-to-br from-white via-blue-50 to-blue-100 h-full flex flex-col min-h-[540px]">
                <div className="relative h-60 overflow-hidden card-image rounded-t-3xl">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  {/* Floating View Details Button */}
                  <Button 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-white/80"
                    size="sm"
                  >
                    View Details
                  </Button>
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="badge bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                      {pkg.badge}
                    </Badge>
                  </div>
                  {/* Social Proof */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30">
                    {/* Rating - now circular and smaller */}
                    <div
                      className="bg-white/95 rounded-full w-11 h-11 flex items-center justify-center shadow-lg border-2 border-yellow-300 mb-1"
                      tabIndex={0}
                      aria-label={`Rated ${pkg.rating} out of 5: ${getRatingLabel(Number(pkg.rating))}`}
                      title={`Rated ${pkg.rating} out of 5: ${getRatingLabel(Number(pkg.rating))}`}
                    >
                      <span className="flex items-center gap-0.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" aria-hidden="true" />
                        <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                      </span>
                    </div>
                    {/* Booked badge */}
                    <div className="bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow-md">
                      <span role="img" aria-label="traveler">🌏</span> Booked {pkg.booked}+ times
                    </div>
                  </div>
                </div>
                <CardContent className="p-7 card-content flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="!text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                      {pkg.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{pkg.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-700">{pkg.price}</div>
                      <div className="line-through text-gray-400 text-sm">{pkg.originalPrice}</div>
                      <div className="text-xs text-gray-500 mt-1">Starting From Per Person</div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm animate-pulse">
                        <span role="img" aria-label="savings">💸</span>
                        Save ₹{(parseInt(pkg.originalPrice.replace('₹', '').replace(',', '')) - parseInt(pkg.price.replace('₹', '').replace(',', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Button className="book-button w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-300 animate-bounce">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* See All Packages Button */}
        <div className="flex justify-center mt-10">
          <Button className="px-8 py-3 text-lg font-bold border-2 border-blue-600 text-blue-700 rounded-full shadow hover:bg-blue-600 hover:text-white hover:cursor-pointer hover:scale-105 transition-all duration-200">
            See All Packages
          </Button>
        </div>
        
        {/* Navigation arrows */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12 space-x-4"
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingDestinations;