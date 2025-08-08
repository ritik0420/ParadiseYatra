"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {  Clock, Users, ArrowRight, Globe, Tent } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface HolidayType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  bgColor: string;
  duration: string;
  travelers: string;
  badge: string;
  price: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const HolidaysSection = () => {
  const [categories, setCategories] = useState<HolidayType[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidayTypes = async () => {
      try {
        const response = await fetch('/api/holiday-types');
        if (response.ok) {
          const data = await response.json();
          // Filter only active holiday types and sort by order
          const activeCategories = data
            .filter((item: HolidayType) => item.isActive)
            .sort((a: HolidayType, b: HolidayType) => a.order - b.order);
          setCategories(activeCategories);
        }
      } catch (error) {
        console.error('Error fetching holiday types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidayTypes();
  }, []);

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
          <div className="animate-pulse flex items-center justify-center mb-2">
            <Tent className="w-5 h-5 text-purple-600" />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-3"
          >
            Holidays for Every Traveler
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-blue-600 text-base font-semibold tracking-wide mb-2"
          >
            Choose Your Perfect Holiday Type
          </motion.p>
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
                  <Image 
                    src={getImageUrl(category.image)} 
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className={`badge ${category.bgColor} text-white px-3 py-1 text-xs font-bold shadow-md`}>
                      {category.badge}
                    </Badge>
                  </div>
                  
                  {/* Floating Explore Button */}
                  <Link href={`/holiday-types/${category.slug}`}>
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
                    <Link href={`/holiday-types/${category.slug}`}>
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
            <Button className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-200 text-white rounded-full shadow hover:from-purple-700 hover:to-purple-600 hover:cursor-pointer hover:scale-105 transition-all duration-200 inline-flex items-center group">
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