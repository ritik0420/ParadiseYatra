"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2, ChevronRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const BlogPage = () => {
  const { getPublishedBlogs } = useBlogs();
  const blogPosts = getPublishedBlogs();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"
    >
      {/* Enhanced Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <a href="/" className="hover:text-blue-600 transition-colors duration-200 font-medium">Home</a>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-semibold">Blog</span>
          </nav>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div 
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <span className="text-blue-100 text-lg font-semibold tracking-wide">Travel Insights</span>
          </motion.div>
          
          <motion.h1 
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-50 to-white bg-clip-text text-transparent"
          >
            Travel Blog & Guides
          </motion.h1>
          
          <motion.p 
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed"
          >
            Discover expert tips, local insights, and comprehensive guides to make your journey unforgettable
          </motion.p>
          
          <motion.div 
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-sm"
          >
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="font-medium">{blogPosts.length} Articles</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <User className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="font-medium">Expert Writers</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="font-medium">Updated Weekly</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Featured Article
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Must Read</h2>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-full overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center text-8xl">
                    {blogPosts[0].image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-bold shadow-lg">
                      {blogPosts[0].category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <User className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{blogPosts[0].author}</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">
                            {new Date(blogPosts[0].publishDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{blogPosts[0].readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-slate-600 mb-8 line-clamp-4 leading-relaxed text-lg">
                    {blogPosts[0].excerpt}
                  </p>
                  <Link href={`/blog/${blogPosts[0].id}`}>
                    <Button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* All Blog Posts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Latest Articles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore Our Collection</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 h-full"
              >
                {/* Blog Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center text-6xl">
                    {post.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 text-xs font-bold shadow-lg">
                      {post.category}
                    </Badge>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full border border-white/30"
                    >
                      <Heart className="w-4 h-4 text-white" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full border border-white/30"
                    >
                      <Share2 className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-slate-100 rounded-full px-3 py-1">
                        <User className="w-4 h-4 mr-1.5 text-blue-500" />
                        <span className="font-medium text-slate-700">{post.author}</span>
                      </div>
                      <div className="flex items-center bg-slate-100 rounded-full px-3 py-1">
                        <Calendar className="w-4 h-4 mr-1.5 text-blue-500" />
                        <span className="font-medium text-slate-700">
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-100 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 mr-1.5 text-blue-500" />
                      <span className="font-medium text-slate-700">{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-auto">
                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group font-semibold shadow-lg hover:shadow-xl">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Stay Updated
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Get Travel Inspiration</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300 border border-white/20"
              />
              <Button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPage; 