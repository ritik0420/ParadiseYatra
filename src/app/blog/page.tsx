"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2, ChevronRight, Sparkles, TrendingUp, Zap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Loading from "@/components/ui/loading";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  image: string;
  category: string;
  readTime: number;
  views: number;
  likes: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();

        // Ensure data is an array before setting
        if (Array.isArray(data)) {
          setBlogPosts(data);
          setError(null);
        } else if (data.blogs && Array.isArray(data.blogs)) {
          setBlogPosts(data.blogs);
          setError(null);
        } else {
          console.error('Unexpected data structure:', data);
          setBlogPosts([]);
          setError('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading size="lg" className="min-h-[400px]" />;
  }

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

  // Don't render if blogPosts is not an array
  if (!Array.isArray(blogPosts)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            {error ? 'Failed to load blog posts.' : 'No blog posts available.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Minimal Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-slate-500">
            <a href="/" className="hover:text-blue-600 transition-colors duration-200">Home</a>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800">Blog</span>
          </nav>
        </div>
      </div>
  
      {/* Clean Hero Section */}
      <section className="relative bg-white py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>Travel Insights</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900"
          >
            Travel Blog & Guides
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Discover expert tips, local insights, and comprehensive guides to make your journey unforgettable
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 text-xs"
          >
            <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5">
              <BookOpen className="w-3 h-3 mr-1.5 text-blue-600" />
              <span>{blogPosts.length} Articles</span>
            </div>
            <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5">
              <User className="w-3 h-3 mr-1.5 text-blue-600" />
              <span>Expert Writers</span>
            </div>
            <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5">
              <Clock className="w-3 h-3 mr-1.5 text-blue-600" />
              <span>Updated Weekly</span>
            </div>
          </motion.div>
        </div>
      </section>
  
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Featured Post - Minimal Card */}
        {blogPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">Featured Article</h2>
              <p className="text-slate-500 max-w-lg mx-auto">Our most popular travel guide this week</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full overflow-hidden">
                  {blogPosts[0].image && blogPosts[0].image.startsWith('http') ? (
                    <img 
                      src={blogPosts[0].image} 
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-6xl">
                      📝
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      {blogPosts[0].category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(blogPosts[0].createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                        {blogPosts[0].author.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-700">{blogPosts[0].author}</span>
                    </div>
                    <Link href={`/blog/${blogPosts[0]._id}`}>
                      <Button className="inline-flex items-center px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 group text-sm font-medium">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
  
        {/* All Blog Posts - Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">Latest Articles</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Browse our collection of travel guides and stories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-100 h-full flex flex-col"
              >
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  {post.image && post.image.startsWith('http') ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-5xl">
                      📝
                    </div>
                  )}
                </div>
  
                {/* Blog Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime} min
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
  
                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 mb-5 line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
  
                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-700">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post._id}`}>
                      <Button variant="ghost" className="text-xs px-3 py-1.5 text-blue-600 hover:bg-blue-50">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
  
        {/* Minimal Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl border border-slate-200 p-8 md:p-10 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <Mail className="w-8 h-8 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">Get Travel Inspiration</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Subscribe to receive our latest travel guides and destination highlights directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-sm rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              />
              <Button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPage; 