"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2, ChevronRight, ArrowLeft, Tag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
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

const BlogDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // Fetch the specific blog post
        const response = await fetch(`/api/blogs/${resolvedParams.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch blog post');
        }
        
        const blogData = await response.json();
        setPost(blogData);

        // Fetch all blogs for related posts
        const allBlogsResponse = await fetch('/api/blogs');
        if (allBlogsResponse.ok) {
          const allBlogsData = await allBlogsResponse.json();
          const allBlogs = Array.isArray(allBlogsData) ? allBlogsData : (allBlogsData.blogs || []);
          
          // Get related posts (excluding current post)
          const related = allBlogs
            .filter((blog: BlogPost) => blog._id !== resolvedParams.id)
            .slice(0, 3);
          setRelatedPosts(related);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchBlogData();
    }
  }, [resolvedParams.id]);

  if (loading) {
    return <Loading size="lg" className="min-h-[400px]" />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            {error || 'Blog post not found.'}
          </p>
          <Link href="/blog">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white/80"
    >
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium line-clamp-1">{post.title}</span>
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
              className="!bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-white/20 mt-10"
            >
              {/* Hero Image */}
              <div className="relative h-64 md:h-96 overflow-hidden">
                {post.image && post.image.startsWith('http') ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-8xl ${post.image && post.image.startsWith('http') ? 'hidden' : ''}`}>
                  {post.image || '📝'}
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
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center justify-between text-sm text-slate-500 mb-8 pb-6 border-b border-slate-200">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{post.readTime} min read</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">{post.views || 0} views</span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-slate-700 leading-relaxed space-y-6">
                    {post.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-900">Tags:</span>
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
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.article
                      key={relatedPost._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 border border-white/20 h-full flex flex-col"
                    >
                      <div className="relative h-40 overflow-hidden">
                        {relatedPost.image && relatedPost.image.startsWith('http') ? (
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-4xl ${relatedPost.image && relatedPost.image.startsWith('http') ? 'hidden' : ''}`}>
                          {relatedPost.image || '📝'}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 text-xs font-bold">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-3 flex-grow">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{relatedPost.author}</span>
                          <span>{relatedPost.readTime} min read</span>
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
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/20 mt-10">
                <h3 className="text-lg font-bold text-slate-900 mb-4">About the Author</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{post.author}</h4>
                    <p className="text-sm text-slate-600">Travel Expert</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Passionate travel writer with years of experience exploring the world's most beautiful destinations.
                </p>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.slice(0, 3).map((popularPost, index) => (
                    <Link key={popularPost._id} href={`/blog/${popularPost._id}`}>
                      <div className="flex items-center mb-2 space-x-3 group cursor-pointer">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                          {popularPost.image || '📝'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                            {popularPost.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1">{popularPost.readTime} min read</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest travel tips and destination guides delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white w-full px-3 py-2 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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