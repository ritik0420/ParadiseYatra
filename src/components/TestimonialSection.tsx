"use client";

import { Star, Quote, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Patel Family",
      location: "Mumbai",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      text: "Our Kedarnath trip with Paradise Yatra was amazing! Everything—from train to darshan—was well-organized. The team was supportive, friendly, and made us feel like family. A truly smooth and memorable spiritual journey.",
      package: "Kedarnath Spiritual Journey",
      date: "March 2024"
    },
    {
      name: "Sarah & Mike",
      location: "Delhi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      text: "The European tour exceeded our expectations! Every detail was perfect, from the hotels to the local guides. Paradise Yatra truly knows how to create unforgettable travel experiences.",
      package: "European Discovery",
      date: "February 2024"
    },
    {
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      text: "Bali was a dream come true! The package was perfectly planned with the right mix of adventure and relaxation. Highly recommend Paradise Yatra for international tours.",
      package: "Bali Paradise",
      date: "January 2024"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
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
            What Our Travelers Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real experiences from real travelers who chose Paradise Yatra for their journeys
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover-lift"
            >
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
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                "{testimonial.text}"
              </p>

              {/* Traveler info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>

              {/* Package info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Package:</span> {testimonial.package}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Traveled:</span> {testimonial.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video testimonial */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Video section */}
              <div className="relative h-64 md:h-full">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Travel experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    Watch Video
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  See Our Travelers in Action
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Watch real testimonials from our satisfied travelers and see how Paradise Yatra creates unforgettable experiences around the world.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.9 Average Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>•</span>
                    <span>500+ Happy Travelers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center mt-12 space-x-4">
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;