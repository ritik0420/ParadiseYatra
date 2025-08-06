"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Plus, Eye, Trash2 } from "lucide-react";

interface Package {
  _id?: string;
  title: string;
  duration: string;
  destination: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  category: string;
  shortDescription: string;
  description?: string;
  reviews?: any[];
  isActive?: boolean;
}

const AdminTrendingDestinations = () => {
  console.log('AdminTrendingDestinations component rendered');
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Package>({
    title: "",
    duration: "",
    destination: "",
    price: 0,
    originalPrice: 0,
    rating: 0,
    images: [],
    category: "trending",
    shortDescription: "",
    description: "",
    reviews: [],
    isActive: true
  });

  useEffect(() => {
    fetchTrendingPackages();
  }, []);

  const fetchTrendingPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages?category=trending');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched trending packages data:', data);
        // Handle both array and object with packages property
        const packagesArray = Array.isArray(data) ? data : (data.packages || []);
        console.log('Packages array:', packagesArray);
        setPackages(packagesArray);
      }
    } catch (error) {
      console.error('Error fetching trending packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/packages/${editing}` : '/api/packages';
      
      // Get the admin token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        alert('Please log in to save changes');
        return;
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchTrendingPackages();
        setEditing(null);
        setShowForm(false);
        resetForm();
        alert(editing ? 'Package updated successfully!' : 'Package added successfully!');
      } else {
        console.error('Failed to save package:', data.message);
        alert(`Failed to save: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditing(pkg._id || '');
    setFormData(pkg);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        // Get the admin token from localStorage
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          alert('Please log in to delete packages');
          return;
        }
        
        const response = await fetch(`/api/packages/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          await fetchTrendingPackages();
          alert('Package deleted successfully!');
        } else {
          console.error('Failed to delete package:', data.message);
          alert(`Failed to delete: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('Network error. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      duration: "",
      destination: "",
      price: 0,
      originalPrice: 0,
      rating: 0,
      images: [],
      category: "trending",
      shortDescription: "",
      description: "",
      reviews: [],
      isActive: true
    });
  };

  const handleAddNew = () => {
    setEditing(null);
    setShowForm(true);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log('Current packages state:', packages);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trending Packages Management</h2>
          <p className="text-gray-600">Manage trending travel packages and their details</p>
          <p className="text-sm text-red-500">Debug: Packages count: {packages.length}</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Trending Package
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? 'Edit Trending Package' : 'Add New Trending Package'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Royal Rajasthan Adventure"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Rajasthan, India"
                  className="bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="7 days"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="trending"
                  className="bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <Textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="A brief overview of the package"
                rows={2}
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the package"
                rows={3}
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="25000"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (Optional)
                </label>
                <Input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="30000"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                  placeholder="4.8"
                  className="bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URLs (comma-separated)
              </label>
              <Input
                value={formData.images?.join(', ') || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  images: e.target.value.split(',').map(img => img.trim()).filter(img => img)
                }))}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="bg-white"
              />
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
                {saving ? 'Saving...' : 'Save Package'}
              </Button>
              <Button variant="admin-outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(packages) && packages.length > 0 ? (
          packages.map((pkg) => (
            <Card key={pkg._id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{pkg.title}</h3>
                    <p className="text-sm text-gray-600">{pkg.destination}</p>
                    <p className="text-xs text-gray-500">{pkg.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {pkg.category === 'trending' && (
                      <Badge variant="default" className="text-xs">Trending</Badge>
                    )}
                    {!pkg.isActive && (
                      <Badge variant="outline" className="text-xs">Inactive</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Rating:</strong> {pkg.rating}/5
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> ₹{pkg.price.toLocaleString()}
                  </p>
                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <p className="text-sm text-green-600">
                      <strong>Save:</strong> ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                    </p>
                  )}
                  {pkg.shortDescription && (
                    <p className="text-sm text-gray-700 line-clamp-2">{pkg.shortDescription}</p>
                  )}
                  {pkg.images && pkg.images.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Images: {pkg.images.length}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="admin-outline"
                    onClick={() => handleEdit(pkg)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="admin-secondary"
                    onClick={() => pkg._id && handleDelete(pkg._id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No trending packages found. Add your first trending package to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrendingDestinations; 