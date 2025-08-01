"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2, ChevronRight, ArrowLeft, Tag, Eye } from "lucide-react";
import { useBlogs } from "@/context/BlogContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

const BlogDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { getPublishedBlogs } = useBlogs();
  const blogPosts = getPublishedBlogs();
  
  const resolvedParams = use(params);
  const post = blogPosts.find(p => p.id === resolvedParams.id);
  
  if (!post) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts.filter(p => p.id !== resolvedParams.id).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8"
            >
              {/* Hero Image */}
              <div className="relative h-64 md:h-96">
                <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-8xl">
                  {post.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 text-xs font-bold shadow-md">
                    {post.category}
                  </Badge>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">1.2k views</span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-sm">
                      Travel Tips
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 px-3 py-1 text-sm">
                      {post.category}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-sm">
                      Adventure
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.article
                      key={relatedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer transition-all duration-300"
                    >
                      <div className="relative h-40">
                        <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-4xl">
                          {relatedPost.image}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 text-xs font-bold">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.author}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Author Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.author}</h4>
                    <p className="text-sm text-gray-600">Travel Expert</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Passionate travel writer with years of experience exploring the world's most beautiful destinations.
                </p>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((popularPost, index) => (
                    <Link key={popularPost.id} href={`/blog/${popularPost.id}`}>
                      <div className="flex items-center mb-2 space-x-3 group cursor-pointer">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                          {popularPost.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                            {popularPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{popularPost.readTime}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest travel tips and destination guides delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <Button className="w-full text-blue-600 font-semibold rounded-lg hover:bg-gray-100 hover:cursor-pointer hover:scale-105 transition-all duration-300 text-sm">
                    Subscribe
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetailPage; 