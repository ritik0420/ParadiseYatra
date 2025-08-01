"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react";

interface Testimonial {
  id: string;
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

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
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
      id: "2",
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
      id: "3",
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      text: "Bali was a dream come true! The package was perfectly planned with the right mix of adventure and relaxation. Highly recommend Paradise Yatra for international tours.",
      package: "Bali Paradise",
      date: "January 2024",
      verified: true,
      featured: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    name: "",
    location: "",
    rating: 5,
    image: "",
    text: "",
    package: "",
    date: "",
    verified: false,
    featured: false
  });

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      location: "",
      rating: 5,
      image: "",
      text: "",
      package: "",
      date: "",
      verified: false,
      featured: false
    });
    setShowForm(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      rating: testimonial.rating,
      image: testimonial.image,
      text: testimonial.text,
      package: testimonial.package,
      date: testimonial.date,
      verified: testimonial.verified,
      featured: testimonial.featured
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingTestimonial) {
      // Update existing testimonial
      setTestimonials(testimonials.map(t => 
        t.id === editingTestimonial.id 
          ? { ...formData, id: editingTestimonial.id }
          : t
      ));
    } else {
      // Add new testimonial
      const newTestimonial: Testimonial = {
        ...formData,
        id: Date.now().toString()
      };
      setTestimonials([...testimonials, newTestimonial]);
    }
    setShowForm(false);
    setEditingTestimonial(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const toggleVerified = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, verified: !t.verified } : t
    ));
  };

  const toggleFeatured = (id: string) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, featured: !t.featured } : t
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
          <p className="text-gray-600">Manage customer testimonials and reviews displayed on your website.</p>
        </div>
        <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Customer Testimonials</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      onClick={() => toggleVerified(testimonial.id)}
                      size="sm"
                      variant="ghost"
                      className={testimonial.verified ? "text-green-600" : "text-gray-400"}
                    >
                      {testimonial.verified ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={() => toggleFeatured(testimonial.id)}
                      size="sm"
                      variant="ghost"
                      className={testimonial.featured ? "text-yellow-600" : "text-gray-400"}
                    >
                      <Star className={`w-4 h-4 ${testimonial.featured ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{testimonial.rating}.0</span>
                </div>

                <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                  "{testimonial.text}"
                </p>

                <div className="text-xs text-gray-500 mb-3">
                  <p><strong>Package:</strong> {testimonial.package}</p>
                  <p><strong>Date:</strong> {testimonial.date}</p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(testimonial)}
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex space-x-2 mt-2">
                  {testimonial.verified && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Verified
                    </span>
                  )}
                  {testimonial.featured && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Name</label>
                <Input
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  placeholder="Enter package name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., March 2024"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`p-2 rounded-lg border ${
                      formData.rating >= rating
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-300"
                    }`}
                  >
                    <Star className={`w-5 h-5 ${
                      formData.rating >= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Text</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the customer's testimonial"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Verified Customer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Review</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
            </Button>
            <Button 
              onClick={() => setShowForm(false)} 
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials; 