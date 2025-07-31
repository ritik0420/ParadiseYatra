"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, ArrowRight, Heart } from "lucide-react";

const DestinationsGrid = () => {
  const destinations = [
    { 
      name: "Europe", 
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Explore ancient cities and modern culture",
      rating: "4.8",
      duration: "8-12 Days",
      travelers: "3,500+",
      price: "₹1,25,000",
      originalPrice: "₹1,40,000",
      badge: "Popular",
      featured: true
    },
    { 
      name: "Singapore", 
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Where tradition meets innovation",
      rating: "4.7",
      duration: "5-7 Days",
      travelers: "2,800+",
      price: "₹65,000",
      originalPrice: "₹75,000",
      badge: "Trending",
      featured: false
    },
    { 
      name: "Thailand", 
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Land of smiles and golden temples",
      rating: "4.9",
      duration: "6-8 Days",
      travelers: "4,200+",
      price: "₹55,000",
      originalPrice: "₹65,000",
      badge: "Best Seller",
      featured: true
    },
    { 
      name: "Dubai", 
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Luxury and architectural marvels",
      rating: "4.6",
      duration: "5-7 Days",
      travelers: "2,100+",
      price: "₹85,000",
      originalPrice: "₹95,000",
      badge: "Luxury",
      featured: false
    },
    { 
      name: "Vietnam", 
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Rich history and stunning landscapes",
      rating: "4.5",
      duration: "7-9 Days",
      travelers: "1,800+",
      price: "₹45,000",
      originalPrice: "₹55,000",
      badge: "Adventure",
      featured: false
    },
    { 
      name: "Nepal", 
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Himalayan adventures await",
      rating: "4.8",
      duration: "8-10 Days",
      travelers: "1,500+",
      price: "₹35,000",
      originalPrice: "₹45,000",
      badge: "Adventure",
      featured: true
    },
    { 
      name: "Bhutan", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The last Shangri-La",
      rating: "4.7",
      duration: "6-8 Days",
      travelers: "900+",
      price: "₹95,000",
      originalPrice: "₹1,10,000",
      badge: "Exclusive",
      featured: false
    },
    { 
      name: "Bali", 
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Island of the gods",
      rating: "4.9",
      duration: "5-7 Days",
      travelers: "3,800+",
      price: "₹75,000",
      originalPrice: "₹85,000",
      badge: "Popular",
      featured: true
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
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-blue-600 text-base font-semibold tracking-wide mb-2"
          >
            Explore Our Top Destinations
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-nunito font-light"
          >
            Discover our most sought-after destinations, each offering unique experiences and unforgettable memories
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {destinations.map((destination, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer modern-card overflow-hidden hover-lift rounded-3xl shadow-xl border-0 relative bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-[520px] flex flex-col"
            >
              <div className="relative h-48 overflow-hidden card-image">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className={`badge ${
                    destination.featured ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-blue-600 to-blue-400'
                  } text-white px-3 py-1 text-xs font-bold shadow-md`}>
                    {destination.badge}
                  </Badge>
                </div>
                
                {/* Heart Icon */}
                <div className="absolute top-4 right-4 z-20">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
                  >
                    <Heart className="w-4 h-4 text-white" />
                  </Button>
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{destination.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 card-content flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {destination.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">{destination.travelers}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-blue-700">{destination.price}</div>
                      <div className="line-through text-gray-400 text-sm">{destination.originalPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full text-xs shadow-sm">
                        <span role="img" aria-label="savings">💸</span>
                        Save ₹{(parseInt(destination.originalPrice.replace('₹', '').replace(',', '')) - parseInt(destination.price.replace('₹', '').replace(',', ''))).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full py-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-300 group">
                    <span>Explore Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Destinations Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Button className="px-8 py-3 text-lg font-bold border-2 border-blue-600 text-blue-700 rounded-full shadow hover:bg-blue-600 hover:text-white hover:cursor-pointer hover:scale-105 transition-all duration-200">
            View All Destinations
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationsGrid;