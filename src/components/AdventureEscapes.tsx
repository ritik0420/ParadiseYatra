"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, ArrowRight, ChevronLeft, ChevronRight, Mountain, Zap } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const AdventureEscapes = () => {
  const adventurePackages = [
    {
      title: "Himalayan Trekking",
      duration: "10N-11D",
      location: "Nepal Himalayas",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Adventure",
      description: "Conquer the mighty Himalayas with expert guides and breathtaking mountain views",
      booked: 1200,
      difficulty: "Moderate",
      altitude: "5,500m",
      features: ["Expert Guides", "Camping", "Mountain Views", "Local Culture"]
    },
    {
      title: "Amazon Jungle Safari",
      duration: "8N-9D",
      location: "Brazil",
      price: "₹85,000",
      originalPrice: "₹1,00,000",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Wildlife",
      description: "Explore the world's largest rainforest with wildlife encounters and river adventures",
      booked: 850,
      difficulty: "Easy",
      altitude: "Sea Level",
      features: ["Wildlife Safari", "River Cruise", "Jungle Lodge", "Bird Watching"]
    },
    {
      title: "Patagonia Expedition",
      duration: "12N-13D",
      location: "Argentina & Chile",
      price: "₹1,25,000",
      originalPrice: "₹1,45,000",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Expedition",
      description: "Trek through the stunning landscapes of Patagonia with glaciers and fjords",
      booked: 650,
      difficulty: "Challenging",
      altitude: "3,000m",
      features: ["Glacier Trek", "Fjord Cruise", "Mountain Hiking", "Wild Camping"]
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <Zap className="w-5 h-5 text-green-600" />
            <span className="text-green-600 text-base font-semibold tracking-wide">Adventure Collection</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Epic Adventure Escapes
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-nunito font-light"
          >
            Push your limits with our adrenaline-pumping adventure packages designed for thrill-seekers and nature enthusiasts
          </motion.p>
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {adventurePackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="h-full flex"
            >
              <Card className="group overflow-hidden modern-card hover-lift rounded-3xl shadow-xl border-0 relative bg-gradient-to-br from-white via-green-50 to-green-100 h-full flex flex-col min-h-[600px]">
                <div className="relative h-60 overflow-hidden card-image rounded-t-3xl">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  
                  {/* Adventure Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="badge bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                      {pkg.badge}
                    </Badge>
                  </div>
                  
                  {/* Difficulty Level */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-gray-900 shadow-lg">
                      {pkg.difficulty}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                    </div>
                  </div>
                  
                  {/* Altitude/Info */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow-md">
                      <Mountain className="w-3 h-3 inline mr-1" />
                      {pkg.altitude}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-7 card-content flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="!text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-200">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                      {pkg.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">{pkg.location}</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-extrabold text-green-700">{pkg.price}</div>
                      <div className="line-through text-gray-400 text-sm">{pkg.originalPrice}</div>
                      <div className="text-xs text-gray-500 mt-1">Starting From Per Person</div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm animate-pulse">
                        <span role="img" aria-label="savings">⚡</span>
                        Save ₹{(parseInt(pkg.originalPrice.replace('₹', '').replace(',', '')) - parseInt(pkg.price.replace('₹', '').replace(',', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Button className="book-button w-full py-3 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-green-300 animate-pulse">
                      Book Adventure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* View All Adventure Packages Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button className="px-8 py-3 text-lg font-bold border-2 border-green-600 text-green-700 rounded-full shadow hover:bg-green-600 hover:text-white hover:cursor-pointer hover:scale-105 transition-all duration-200">
            View All Adventure Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AdventureEscapes;