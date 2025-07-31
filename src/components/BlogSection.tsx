"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2 } from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BlogSection = () => {
  const { getPublishedBlogs } = useBlogs();
  const blogPosts = getPublishedBlogs();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Don't render if no published blogs
  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 text-base font-semibold tracking-wide">Travel Insights</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          >
            Travel Insights & Guides
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto font-nunito font-light"
          >
            Discover expert tips, local insights, and comprehensive guides to make your journey unforgettable
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl shadow-xl hover:cursor-pointer transition-all duration-500 overflow-hidden group border-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col h-full"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-6xl">
                  {post.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="badge bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                    {post.category}
                  </Badge>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
                  >
                    <Heart className="w-4 h-4 text-white" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-8 h-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-blue-500" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                      <span className="font-medium">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-blue-500" />
                    <span className="font-medium">{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="mt-auto">
                  <Button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group font-semibold">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            <span>View All Blog Posts</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 