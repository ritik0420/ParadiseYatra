"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Star, ArrowRight, Calendar, Hotel, Utensils } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  accommodation: string;
  meals: string;
  image: string;
}

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
  itinerary: DayItinerary[];
}

interface Package {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  discount: number;
  duration: string;
  destination: string;
  category: string;
  images: string[];
  rating: number;
  isActive: boolean;
  isFeatured: boolean;
}

const HolidayTypePage = () => {
  const params = useParams();
  const [holidayType, setHolidayType] = useState<HolidayType | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHolidayType = async () => {
      try {
        const response = await fetch(`/api/holiday-types/slug/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setHolidayType(data);
        } else {
          setError("Holiday type not found");
        }
      } catch {
        setError("Failed to load holiday type");
      } finally {
        setLoading(false);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          // Filter packages that match the holiday type category
          const filteredPackages = data.filter((pkg: Package) => 
            pkg.isActive && pkg.category === 'holiday'
          );
          setPackages(filteredPackages.slice(0, 6)); // Show first 6 packages
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    if (params.slug) {
      fetchHolidayType();
      fetchPackages();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !holidayType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Holiday Type Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The holiday type you're looking for doesn't exist."}</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={holidayType.image}
            alt={holidayType.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className={`mb-4 ${holidayType.bgColor} text-white px-4 py-2 text-sm font-bold`}>
                {holidayType.badge}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{holidayType.title}</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6">
                {holidayType.shortDescription}
              </p>
              <div className="flex items-center justify-center space-x-8 text-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{holidayType.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{holidayType.travelers} travelers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>{holidayType.price}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About {holidayType.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {holidayType.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Itinerary Section */}
      {holidayType.itinerary && holidayType.itinerary.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {holidayType.title} Itinerary
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience the perfect {holidayType.title.toLowerCase()} journey with our carefully planned itinerary
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {holidayType.itinerary.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={day.image}
                        alt={`Day ${day.day} - ${day.title}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white text-lg font-bold px-4 py-2">
                          Day {day.day}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {day.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Hotel className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700 font-medium">Accommodation:</span>
                          <span className="text-gray-600">{day.accommodation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Utensils className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700 font-medium">Meals:</span>
                          <span className="text-gray-600">{day.meals}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Activities:</h4>
                        <ul className="space-y-2">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured {holidayType.title} Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated packages for the perfect {holidayType.title.toLowerCase()} experience
            </p>
          </motion.div>

          {packages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={pkg.images[0] || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                      {pkg.discount > 0 && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                          {pkg.discount}% OFF
                        </Badge>
                      )}
                      {pkg.isFeatured && (
                        <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {pkg.shortDescription}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{pkg.destination}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{pkg.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{pkg.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <Link href={`/packages/${pkg.slug}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center py-12"
            >
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Packages Available
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re currently preparing amazing packages for {holidayType.title.toLowerCase()}. Check back soon!
              </p>
              <Link href="/packages">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse All Packages
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience {holidayType.title}?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact our travel experts to plan your perfect {holidayType.title.toLowerCase()} adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link href="/packages">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View All Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HolidayTypePage; 