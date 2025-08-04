"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Loading from "@/components/ui/loading";
import React from "react";
import Link from "next/link";

interface Package {
  _id: string;
  title: string;
  duration: string;
  destination: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  category: string;
  shortDescription: string;
  reviews?: any[];
}

function getRatingLabel(rating: number) {
  if (rating >= 4.7) return "Excellent";
  if (rating >= 4.5) return "Great";
  if (rating >= 4.0) return "Good";
  return "Average";
}

const TrendingDestinations = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/packages?category=trending');
        
        if (!response.ok) {
          throw new Error('Failed to fetch trending packages');
        }
        
        const data = await response.json();

        console.log('API Response:', data); // Debug log
        
        // Ensure data is an array before calling slice
        if (Array.isArray(data)) {
          console.log('Packages data:', data.slice(0, 3)); // Debug log
          setPackages(data.slice(0, 3)); // Show only first 3 packages
          setError(null);
        } else if (data.packages && Array.isArray(data.packages)) {
          console.log('Packages data:', data.packages.slice(0, 3)); // Debug log
          setPackages(data.packages.slice(0, 3));
          setError(null);
        } else {
          console.error('Unexpected data structure:', data);
          setPackages([]);
          setError('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching trending packages:', err);
        setError('Failed to load trending packages');
        setPackages([]); // Don't show static data, show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPackages();
  }, []);

  if (loading) {
    return <Loading size="lg" className="min-h-[400px]" />;
  }

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

        {packages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
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
                    src={pkg.images?.[0] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error('Image failed to load:', pkg.images?.[0]);
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  {/* Floating View Details Button */}
                  <Link href={`/itinerary/royal-rajasthan`}>
                    <Button 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/20 backdrop-blur-lg text-black px-4 py-1 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-white/20 text-xs"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Link>
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="badge bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                      {pkg.category === 'trending' ? 'Trending' : pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                    </Badge>
                  </div>
                  {/* Social Proof */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-30">
                    {/* Rating - now circular and smaller */}
                    <div
                      className="bg-white/95 rounded-full w-11 h-11 flex items-center justify-center shadow-lg border-2 border-yellow-300 mb-1"
                      tabIndex={0}
                      aria-label={`Rated ${pkg.rating} out of 5: ${getRatingLabel(Number(pkg.rating))}`}
                      title={`Rated ${pkg.rating} out of 5: ${getRatingLabel(pkg.rating)}`}
                    >
                      <span className="flex items-center gap-0.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-0.5" aria-hidden="true" />
                        <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                      </span>
                    </div>
                    {/* Booked badge */}
                    <div className="bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shadow-md">
                      <span role="img" aria-label="traveler">🌏</span> Booked {pkg.reviews?.length || 12}+ times
                    </div>
                  </div>
                </div>
                <CardContent className="p-7 card-content flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="!text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-4 font-medium">
                      {pkg.shortDescription}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{pkg.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-extrabold text-blue-700">₹{pkg.price.toLocaleString()}</div>
                      {pkg.originalPrice && (
                        <div className="line-through text-gray-400 text-sm">₹{pkg.originalPrice.toLocaleString()}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">Starting From Per Person</div>
                    </div>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs shadow-sm animate-pulse">
                          <span role="img" aria-label="savings">💸</span>
                          Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link href={`/itinerary/royal-rajasthan`}>
                      <Button className="book-button w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-300 animate-bounce">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {error ? 'Failed to load trending packages.' : 'No trending packages available.'}
            </p>
          </div>
        )}
        {/* See All Packages Button */}
        <div className="flex justify-center mt-10">
          <Link href="/packages/trending">
            <Button className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200">
              View All Trending Packages
            </Button>
          </Link>
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