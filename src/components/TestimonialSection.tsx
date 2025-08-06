"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote, Play, ChevronLeft, ChevronRight, Award, Users, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/loading";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  text: string;
  package: string;
  date: string;
  verified: boolean;
  featured: boolean;
}

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        
        // First try to get featured testimonials
        let response = await fetch('/api/testimonials?featured=true');
        let data = await response.json();
        
        // If no featured testimonials, get all testimonials
        if (!response.ok || data.length === 0) {
          response = await fetch('/api/testimonials');
          data = await response.json();
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        // Set fallback data
        setTestimonials([
          {
            _id: "1",
            name: "Patel Family",
            location: "Mumbai",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            text: "Our Kedarnath trip with Paradise Yatra was amazing! Everything—from train to darshan—was well-organized. The team was supportive, friendly, and made us feel like family. A truly smooth and memorable spiritual journey.",
            package: "Kedarnath Spiritual Journey",
            date: "March 2024",
            verified: true,
            featured: true
          },
          {
            _id: "2",
            name: "Sarah & Mike",
            location: "Delhi",
            rating: 5,
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            text: "The European tour exceeded our expectations! Every detail was perfect, from the hotels to the local guides. Paradise Yatra truly knows how to create unforgettable travel experiences.",
            package: "European Discovery",
            date: "February 2024",
            verified: true,
            featured: false
          },
          {
            _id: "3",
            name: "Rajesh Kumar",
            location: "Bangalore",
            rating: 5,
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            text: "Bali was a dream come true! The package was perfectly planned with the right mix of adventure and relaxation. Highly recommend Paradise Yatra for international tours.",
            package: "Bali Paradise",
            date: "January 2024",
            verified: true,
            featured: true
          },
          {
            _id: "4",
            name: "Priya Sharma",
            location: "Chennai",
            rating: 5,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            text: "The Kashmir package was absolutely breathtaking! The snow-covered mountains and pristine lakes were exactly as promised. Paradise Yatra made our dream vacation a reality.",
            package: "Kashmir Paradise",
            date: "December 2023",
            verified: true,
            featured: false
          },
          {
            _id: "5",
            name: "David & Emma",
            location: "London",
            rating: 5,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            text: "Amazing experience with Paradise Yatra! The Rajasthan tour was perfectly organized with authentic experiences and luxury accommodations. Highly recommended!",
            package: "Rajasthan Heritage",
            date: "November 2023",
            verified: true,
            featured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (loading) {
    return <Loading size="lg" className="min-h-[400px]" />;
  }

  // Get visible testimonials based on current index
  const getVisibleTestimonials = () => {
    if (testimonials.length <= 3) return testimonials;
    return testimonials.slice(currentIndex, currentIndex + 3);
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 text-base font-semibold tracking-wide">Customer Stories</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            What Our Travelers Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-nunito font-light"
          >
            Real experiences from real travelers who chose Paradise Yatra for their journeys
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows - Desktop */}
          {testimonials.length > 1 && (
            <>
              <motion.button 
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <motion.button 
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            </>
          )}

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="relative overflow-hidden px-4 sm:px-8 md:px-16 lg:px-20"
          >
            {/* Desktop/Tablet Grid View */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 mb-10"
                >
                  {visibleTestimonials.map((testimonial, index) => (
                    <motion.div 
                      key={`${testimonial._id}-${currentIndex}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="relative bg-white rounded-3xl p-6 lg:p-8 shadow-xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-[400px] flex flex-col overflow-hidden"
                    >
                      {/* Top right: Verified badge */}
                      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                        {testimonial.verified && (
                          <Badge className="badge bg-green-100 text-green-700 px-2 py-1 text-xs font-bold">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      
                      {/* Featured Badge */}
                      {testimonial.featured && (
                        <div className="mb-4">
                          <Badge className="badge bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold shadow-md">
                            Featured Review
                          </Badge>
                        </div>
                      )}
                      
                      {/* Rating */}
                      <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 font-medium">
                          {testimonial.rating}.0
                        </span>
                      </div>

                      {/* Quote */}
                      <Quote className="w-8 h-8 text-blue-600 mb-4 opacity-50" />
                      
                      {/* Testimonial text */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-sm flex-grow">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Traveler info */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <span>📍</span>
                            {testimonial.location}
                          </div>
                        </div>
                      </div>

                      {/* Package info */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">Package:</span> {testimonial.package}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Traveled:</span> {testimonial.date}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Sliding Carousel */}
            <div className="md:hidden">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full"
                  >
                    <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-sm border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-[450px] flex flex-col overflow-hidden mx-2 mb-2">
                      {/* Top right: Verified badge */}
                      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                        {testimonials[currentIndex]?.verified && (
                          <Badge className="badge bg-green-100 text-green-700 px-2 py-1 text-xs font-bold">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      
                      {/* Featured Badge */}
                      {testimonials[currentIndex]?.featured && (
                        <div className="mb-4">
                          <Badge className="badge bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 text-xs font-bold shadow-md">
                            Featured Review
                          </Badge>
                        </div>
                      )}
                      
                      {/* Rating */}
                      <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400">
                          {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600 font-medium">
                          {testimonials[currentIndex]?.rating || 5}.0
                        </span>
                      </div>

                      {/* Quote */}
                      <Quote className="w-8 h-8 text-blue-600 mb-4 opacity-50" />
                      
                      {/* Testimonial text */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-sm flex-grow">
                        &ldquo;{testimonials[currentIndex]?.text}&rdquo;
                      </p>

                      {/* Traveler info */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {testimonials[currentIndex]?.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{testimonials[currentIndex]?.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <span>📍</span>
                            {testimonials[currentIndex]?.location}
                          </div>
                        </div>
                      </div>

                      {/* Package info */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">Package:</span> {testimonials[currentIndex]?.package}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Traveled:</span> {testimonials[currentIndex]?.date}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {testimonials.length > 1 && (
            <div className="flex md:hidden justify-center items-center mt-8 space-x-6">
              <motion.button 
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              {/* Dots for mobile */}
              <div className="flex space-x-2">
                {Array.from({ length: testimonials.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button 
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          )}

          {/* Dots Indicator - Desktop */}
          {testimonials.length > 1 && (
            <div className="hidden md:flex justify-center mt-8 space-x-2">
              {Array.from({ length: testimonials.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: "Happy Travelers", value: "5000+", color: "text-blue-600" },
            { icon: Star, label: "Average Rating", value: "4.9/5", color: "text-yellow-600" },
            { icon: ThumbsUp, label: "Satisfaction Rate", value: "98%", color: "text-green-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Video section */}
              <div className="relative h-64 md:h-full card-image">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Travel experience"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="badge bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    Watch Video
                  </Badge>
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 sm:p-8 flex flex-col justify-center card-content">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  See Our Travelers in Action
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                  Watch real testimonials from our satisfied travelers and see how Paradise Yatra creates unforgettable experiences around the world.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.9 Average Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="hidden sm:inline">•</span>
                    <span>500+ Happy Travelers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;