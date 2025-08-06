"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Plus, Eye, Trash2 } from "lucide-react";

interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  status: "published" | "draft";
  isActive: boolean;
  // Backend fields
  isPublished?: boolean;
  isFeatured?: boolean;
}

interface AdminBlogsProps {
  initialAction?: string | null;
  onActionComplete?: () => void;
}

const AdminBlogs = ({ initialAction, onActionComplete }: AdminBlogsProps) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"create" | "all">("all");

  // Handle initial action from sidebar
  useEffect(() => {
    if (initialAction === 'create') {
      setActiveTab("create");
      setEditing(null);
      onActionComplete?.();
    }
  }, [initialAction, onActionComplete]);

  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    status: "draft",
    readTime: "",
    image: "📝",
    slug: "",
    publishDate: "",
    isActive: true
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();
      
      if (response.ok) {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (data.blogs && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          console.error('Unexpected data structure:', data);
          setBlogs([]);
        }
      } else {
        console.error('Failed to fetch blogs:', data.message);
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/blogs/${editing}` : '/api/blogs';
      
      // Get the admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('Please log in to save changes');
        return;
      }
      
      // Transform formData to match backend expectations
      const backendData = {
        ...formData,
        isPublished: formData.status === 'published',
        isFeatured: formData.status === 'published', // Auto-mark published blogs as featured
        readTime: parseInt(formData.readTime) || 5,
        // Remove frontend-specific fields
        status: undefined,
        publishDate: undefined,
        isActive: undefined
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(backendData),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchBlogs();
        setEditing(null);
        setActiveTab("all");
        resetForm();
        alert(editing ? 'Blog updated successfully!' : 'Blog added successfully!');
      } else {
        console.error('Failed to save blog:', data.message);
        alert(`Failed to save: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditing(blog._id || '');
    // Transform backend data to frontend format
    const status = blog.isPublished ? 'published' : 'draft';
    const frontendData: BlogPost = {
      ...blog,
      status,
      readTime: blog.readTime?.toString() || '5',
      publishDate: blog.publishDate || '',
      isActive: blog.isActive !== undefined ? blog.isActive : true
    };
    setFormData(frontendData);
    setActiveTab("create");
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        // Get the admin token from localStorage
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          alert('Please log in to delete blogs');
          return;
        }
        
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          await fetchBlogs();
          alert('Blog deleted successfully!');
        } else {
          console.error('Failed to delete blog:', data.message);
          alert(`Failed to delete: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Network error. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setActiveTab("all");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      category: "",
      status: "draft",
      readTime: "",
      image: "📝",
      slug: "",
      publishDate: "",
      isActive: true
    });
  };

  const handleAddNew = () => {
    setEditing(null);
    setActiveTab("create");
    resetForm();
  };

  const handleShowAllBlogs = () => {
    setActiveTab("all");
    setEditing(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">
            {activeTab === "all" 
              ? `Manage blog posts and articles (${Array.isArray(blogs) ? blogs.length : 0} blogs)` 
              : editing 
                ? "Edit blog post" 
                : "Create new blog post"
            }
          </p>
        </div>
        <Button 
          onClick={() => {
            setActiveTab("create");
            setEditing(null);
            resetForm();
          }} 
          variant="admin-primary"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Blog
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={handleShowAllBlogs}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "all"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All Blogs ({Array.isArray(blogs) ? blogs.length : 0})
        </button>
        <button
          onClick={handleAddNew}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === "create"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {editing ? 'Edit Blog' : 'Create Blog'}
        </button>
      </div>

      {activeTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Blog post title"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Travel Guide"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time
                </label>
                <Input
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="5 min read"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "published" | "draft" }))}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the blog post..."
                rows={3}
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Blog post content..."
                rows={8}
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="blog-post-slug"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleSave} 
                disabled={saving}
                variant="admin-primary"
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Blog'}
              </Button>
              <Button variant="admin-outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "all" && (
        <div>
          {Array.isArray(blogs) && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card key={blog._id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-gray-600">{blog.author}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                          {blog.status}
                        </Badge>
                        {!blog.isActive && (
                          <Badge variant="outline" className="text-xs">Inactive</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Category:</strong> {blog.category}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Read Time:</strong> {blog.readTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Published:</strong> {blog.publishDate}
                      </p>
                      {blog.excerpt && (
                        <p className="text-sm text-gray-700 line-clamp-3">{blog.excerpt}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="admin-outline"
                        onClick={() => handleEdit(blog)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="admin-secondary"
                        onClick={() => blog._id && handleDelete(blog._id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 text-center mb-4">
                  {Array.isArray(blogs) ? 'No blog posts found.' : 'Loading blogs...'}
                </p>
                <Button onClick={handleAddNew} variant="admin-primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Blog
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBlogs; 