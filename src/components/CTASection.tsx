"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, MapPin, Calendar, Star, Shield, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import Loading from "@/components/ui/loading";

interface CTAContent {
  title: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
}

const CTASection = () => {
  const [ctaContent, setCTAContent] = useState<CTAContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCTAContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cta');
        
        if (!response.ok) {
          throw new Error('Failed to fetch CTA content');
        }
        
        const data = await response.json();
        setCTAContent(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching CTA content:', err);
        setError('Failed to load CTA content');
        // Set default content as fallback
        setCTAContent({
          title: "Ready for Your Next Adventure?",
          description: "Join thousands of travelers who trust Paradise Yatra for their dream vacations. Start planning your perfect journey today and create memories that last a lifetime.",
          backgroundImage: "/banner.jpeg",
          buttonText: "Start Your Journey",
          buttonLink: "/packages"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCTAContent();
  }, []);

  if (loading) {
    return <Loading size="lg" className="min-h-[400px]" />;
  }
  return (
    <section 
      className="section-padding text-white relative overflow-hidden" 
      style={{
        backgroundImage: `url(${ctaContent?.backgroundImage || '/banner.jpeg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white/20 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-white/20 rounded-full animate-float animation-delay-4000"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full animate-float animation-delay-6000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 text-base font-semibold tracking-wide">Ready to Explore?</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              {ctaContent?.title || "Ready for Your Next Adventure?"}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed font-nunito font-light"
            >
              {ctaContent?.description || "Join thousands of travelers who trust Paradise Yatra for their dream vacations. Start planning your perfect journey today and create memories that last a lifetime."}
            </motion.p>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Globe, title: "Global Destinations", desc: "Explore 50+ countries worldwide", color: "text-blue-300" },
              { icon: MapPin, title: "Customized Tours", desc: "Personalized experiences for you", color: "text-green-300" },
              { icon: Calendar, title: "Flexible Booking", desc: "Book now, travel when you want", color: "text-purple-300" },
              { icon: Shield, title: "Safe Travel", desc: "Your safety is our priority", color: "text-yellow-300" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.0 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="flex flex-col items-center space-y-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-blue-100 text-sm text-center">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="hover:scale-105 hover:cursor-pointer hover:bg-gray-100 text-blue-600 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                {ctaContent?.buttonText || "Start Planning"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] text-lg"
              >
                View Packages
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-200"
          >
            {[
              { icon: Users, text: "500+ Happy Travelers" },
              { icon: Star, text: "4.9/5 Rating" },
              { icon: Clock, text: "24/7 Support" },
              { icon: Shield, text: "Safe & Secure" }
            ].map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <indicator.icon className="w-4 h-4" />
                <span className="font-medium">{indicator.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;