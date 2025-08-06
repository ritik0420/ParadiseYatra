"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/ui/optimized-image";

interface DayItineraryCardProps {
  day: {
    day: number;
    title: string;
    activities: string[];
    accommodation: string;
    meals: string;
    image: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

const DayItineraryCard = ({ day, isExpanded, onToggle }: DayItineraryCardProps) => {
  // Multiple fallback images for better reliability - using more reliable Unsplash URLs
  const fallbackImages = [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  // Use fallback if image is empty or undefined
  const displayImage = (!day.image || day.image === "") ? fallbackImages[0] : day.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 mb-8 overflow-hidden group">
        <div className="relative">
          <OptimizedImage 
            src={displayImage} 
            alt={`Day ${day.day} - ${day.title}`}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            fallbackSrc={fallbackImages[1]}
          />
          <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            Day {day.day}
          </div>
        </div>
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h3 className="text-2xl text-gray-900 font-bold mb-4 tracking-tight">{day.title}</h3>
              <div className="space-y-3">
                <div className="flex items-center text-base text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="font-medium">{day.accommodation}</span>
                </div>
                <div className="flex items-center text-base text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-amber-500" />
                  <span className="font-medium">Meals: {day.meals}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-full transition-all duration-300"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="border-t border-gray-200 pt-6"
            >
              <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                Activities:
              </h4>
              <ul className="space-y-3">
                {day.activities.map((activity, index) => (
                  <li key={index} className="flex items-start group">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 text-lg leading-relaxed">{activity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DayItineraryCard; 