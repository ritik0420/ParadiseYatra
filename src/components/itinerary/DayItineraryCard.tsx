"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="modern-card hover-lift mb-6 overflow-hidden">
        <div className="relative">
          <img 
            src={day.image} 
            alt={`Day ${day.day} - ${day.title}`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute text-gray-900 top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
            Day {day.day}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl text-gray-900 font-semibold mb-2">{day.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{day.accommodation}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Meals: {day.meals}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? "Show Less" : "Show Details"}
            </Button>
          </div>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t pt-4"
            >
              <h4 className="font-semibold text-gray-900 mb-3">Activities:</h4>
              <ul className="space-y-2">
                {day.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{activity}</span>
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