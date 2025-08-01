"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

const HolidaysSection = () => {
  const categories = [
    {
      title: "Beach Holidays",
      description: "Discover pristine beaches and crystal-clear waters with our curated beach vacation packages.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      duration: "5-7 Days",
      travelers: "2,500+",
      badge: "Popular",
      price: "From ₹45,000"
    },
    {
      title: "Mountain Treks",
      description: "Adventure awaits in the mountains with guided treks and camping experiences.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600",
      duration: "3-5 Days",
      travelers: "1,800+",
      badge: "Adventure",
      price: "From ₹35,000"
    },
    {
      title: "City Breaks",
      description: "Explore vibrant cities and urban destinations with cultural experiences.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
      duration: "4-6 Days",
      travelers: "3,200+",
      badge: "Trending",
      price: "From ₹55,000"
    },
    {
      title: "Wildlife Tours",
      description: "Get close to nature with exciting wildlife safaris and nature reserves.",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-600",
      duration: "6-8 Days",
      travelers: "1,500+",
      badge: "Exclusive",
      price: "From ₹75,000"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-blue-600 text-base font-semibold tracking-wide mb-2"
          >
            Choose Your Perfect Holiday Type
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Holidays for Every Traveler
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-nunito font-light"
          >
            From beach getaways to mountain adventures, find the perfect holiday type that matches your travel style
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="h-full flex"
            >
              <Card className="group overflow-hidden modern-card hover-lift rounded-3xl shadow-xl border-0 relative bg-gradient-to-br from-white via-gray-50 to-gray-100 h-full flex flex-col min-h-[480px]">
                <div className="relative h-48 overflow-hidden card-image rounded-t-3xl">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className={`badge ${category.bgColor} text-white px-3 py-1 text-xs font-bold shadow-md`}>
                      {category.badge}
                    </Badge>
                  </div>
                  
                  {/* Floating Explore Button */}
                  <Link href={`/itinerary/royal-rajasthan`}>
                    <Button 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md text-gray-800 px-6 py-2 rounded-full shadow-xl hover:bg-blue-600 hover:shadow-2xl hover:cursor-pointer hover:scale-110 transition-all duration-300 border border-white/30 text-sm font-semibold group"
                      size="sm"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200">Explore</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </div>
                
                <CardContent className="p-6 card-content flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="!text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-200">
                      {category.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 font-medium">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{category.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">{category.travelers}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-bold text-blue-700">{category.price}</div>
                      <div className="text-xs text-gray-500">Per Person</div>
                    </div>
                    <Link href={`/itinerary/royal-rajasthan`}>
                      <Button className="w-full py-2 text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 hover:cursor-pointer hover:scale-105 transition-all duration-200 focus:ring-2 focus:ring-blue-300 group">
                        <span>Discover More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* View All Categories Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link href="/packages/holidays">
            <Button className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow hover:from-blue-700 hover:to-blue-600 hover:cursor-pointer hover:scale-105 transition-all duration-200 inline-flex items-center group">
              <Globe className="w-5 h-5 mr-2 group-hover:text-blue-200 transition-colors" />
              View All Holiday Types
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HolidaysSection;