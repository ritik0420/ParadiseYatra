"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
      description: "Experience the grandeur of royal palaces and desert landscapes"
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
      description: "Mountain adventures and scenic train journeys"
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
      description: "Tropical beaches and cultural experiences"
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
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {trendingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group overflow-hidden modern-card hover-lift">
                <div className="relative h-56 overflow-hidden card-image">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="badge">
                      {pkg.badge}
                    </Badge>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 rating-badge">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-800">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 card-content">
                  <div className="mb-6">
                    <h3 className="!text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{pkg.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="price">{pkg.price}</div>
                      <div className="original-price">{pkg.originalPrice}</div>
                      <div className="text-xs text-gray-500 mt-1">Starting From Per Person</div>
                    </div>
                    <div className="text-right">
                      <div className="savings">
                        Save ₹{(parseInt(pkg.originalPrice.replace('₹', '').replace(',', '')) - parseInt(pkg.price.replace('₹', '').replace(',', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="book-button">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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