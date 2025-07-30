"use client";

import { Facebook, Twitter, Instagram, Youtube, Linkedin, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    international: [
      { name: "Singapore", href: "#" },
      { name: "Thailand", href: "#" },
      { name: "Malaysia", href: "#" },
      { name: "Vietnam", href: "#" },
      { name: "Europe", href: "#" },
      { name: "Dubai", href: "#" },
      { name: "Maldives", href: "#" }
    ],
    india: [
      { name: "Rajasthan", href: "#" },
      { name: "Kerala", href: "#" },
      { name: "Himachal", href: "#" },
      { name: "Uttarakhand", href: "#" },
      { name: "Goa", href: "#" },
      { name: "Kashmir", href: "#" }
    ],
    trekking: [
      { name: "Kedarnath", href: "#" },
      { name: "Badrinath", href: "#" },
      { name: "Valley of Flowers", href: "#" },
      { name: "Roopkund", href: "#" },
      { name: "Har Ki Dun", href: "#" }
    ],
    quickLinks: [
      { name: "Home", href: "#" },
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", bgColor: "bg-blue-600 hover:bg-blue-700" },
    { icon: Twitter, href: "#", bgColor: "bg-sky-500 hover:bg-sky-600" },
    { icon: Instagram, href: "#", bgColor: "bg-gradient-to-tr from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" },
    { icon: Youtube, href: "#", bgColor: "bg-red-600 hover:bg-red-700" },
    { icon: Linkedin, href: "#", bgColor: "bg-blue-700 hover:bg-blue-800" }
  ];

  return (
    <footer className="bg-gray-900 text-white relative pt-24 pb-16">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"></div>
      
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
        >
          {/* Company info */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                <p>Paradise Yatra</p>
                <img src="/logo.png" alt="logo" className="h-35 w-35" />
              </span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-300 mb-6 leading-relaxed"
            >
              Your trusted partner for unforgettable travel experiences. We specialize in creating personalized journeys that combine adventure, culture, and luxury.
            </motion.p>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-3 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>48, General Mahadev Singh Rd, Dehradun, Uttarakhand 248001</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>+91 8979396413</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>info@paradiseyatra.com</span>
              </div>
            </div>
          </div>

          {/* International Tours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-blue-200">
              International Tours
            </h3>
            <ul className="space-y-3">
              {footerLinks.international.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* India Tours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-blue-200">
              India Tours
            </h3>
            <ul className="space-y-3">
              {footerLinks.india.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-blue-200">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="border-t border-gray-800 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Paradise Yatra. All rights reserved.
              </p>
            </div>

            {/* Social media */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 ${social.bgColor} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow hover:shadow-lg`}
                  aria-label={`Follow us on ${social.icon.name}`}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating WhatsApp button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <a 
          href="#" 
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group relative"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        </a>
      </motion.div>
    </footer>
  );
};

export default Footer;