"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, ArrowRight, ChevronLeft, ChevronRight, Mountain, Zap } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Loading from "@/components/ui/loading";

interface AdventurePackage {
  _id: string;
  title: string;
  duration: string;
  destination: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  category: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  isActive: boolean;
  isFeatured: boolean;
}

const AdventureEscapes = () => {
  const [adventurePackages, setAdventurePackages] = useState<AdventurePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdventurePackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/adventure-packages?limit=3');
        
        if (!response.ok) {
          throw new Error('Failed to fetch adventure packages');
        }
        
        const data = await response.json();
        // Extract packages array from the response
        const packagesArray = data.packages || data;
        setAdventurePackages(packagesArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching adventure packages:', err);
        setError('Failed to load adventure packages');
        // Set fallback data
        setAdventurePackages([
          {
            _id: "1",
            title: "Himalayan Trekking",
            duration: "10N-11D",
            destination: "Nepal Himalayas",
            price: 45000,
            originalPrice: 55000,
            rating: 4.8,
            images: ["https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            category: "adventure",
            description: "Conquer the mighty Himalayas with expert guides and breathtaking mountain views",
            shortDescription: "Mountain adventure with expert guides",
            highlights: ["Expert Guides", "Camping", "Mountain Views", "Local Culture"],
            isActive: true,
            isFeatured: false
          },
          {
            _id: "2",
            title: "Amazon Jungle Safari",
            duration: "8N-9D",
            destination: "Brazil",
            price: 85000,
            originalPrice: 100000,
            rating: 4.7,
            images: ["https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            category: "adventure",
            description: "Explore the world's largest rainforest with wildlife encounters and river adventures",
            shortDescription: "Wildlife adventure in the Amazon",
            highlights: ["Wildlife Safari", "River Cruise", "Jungle Lodge", "Bird Watching"],
            isActive: true,
            isFeatured: false
          },
          {
            _id: "3",
            title: "Patagonia Expedition",
            duration: "12N-13D",
            destination: "Argentina & Chile",
            price: 125000,
            originalPrice: 145000,
            rating: 4.9,
            images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
            category: "adventure",
            description: "Trek through the stunning landscapes of Patagonia with glaciers and fjords",
            shortDescription: "Glacier trekking adventure",
            highlights: ["Glacier Trek", "Fjord Cruise", "Mountain Hiking", "Wild Camping"],
            isActive: true,
            isFeatured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventurePackages();
  }, []);

  if (loading) {
    return <Loading size="lg" className="min-h-[500px]" />;
  }

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
              key={pkg._id}
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
                    src={pkg.images?.[0] || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  
                  {/* Adventure Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="badge bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                      Adventure
                    </Badge>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
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
                        <span className="font-semibold">{pkg.destination}</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {pkg.highlights?.slice(0, 4).map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-extrabold text-green-700">₹{pkg.price?.toLocaleString()}</div>
                      {pkg.originalPrice && (
                        <div className="line-through text-gray-400 text-sm">₹{pkg.originalPrice.toLocaleString()}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">Starting From Per Person</div>
                    </div>
                    {pkg.originalPrice && (
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm animate-pulse">
                          <span role="img" aria-label="savings">⚡</span>
                          Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <Link href={`/itinerary/${pkg._id}`}>
                      <Button className="book-button w-full py-3 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-700 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-green-300 animate-pulse">
                        Book Adventure
                      </Button>
                    </Link>
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
          <Link href="/packages/adventure">
            <Button className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow hover:from-green-700 hover:to-emerald-700 hover:cursor-pointer hover:scale-105 transition-all duration-200 inline-flex items-center group">
              <Mountain className="w-5 h-5 mr-2 group-hover:text-green-200 transition-colors" />
              View All Adventure Packages
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AdventureEscapes;