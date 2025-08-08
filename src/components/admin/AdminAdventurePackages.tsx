"use client";

import { useState, useEffect } from "react";
import { Mountain, Star, MapPin, Clock, Users, Edit, Trash2, Plus, Eye, Zap } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import ImageUpload from "@/components/ui/image-upload";
import { getImageUrl } from "@/lib/utils";

interface AdventurePackage {
  _id: string;
  title: string;
  duration: string;
  destination: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  category: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  isActive: boolean;
  isFeatured: boolean;
}

interface PackageData {
  title: string;
  duration: string;
  destination: string;
  price: number;
  originalPrice?: number; 
  rating: number;
  images: string[];
  description: string;
  shortDescription: string;
  highlights: string[]; 
  isActive: boolean;
}

const AdminAdventurePackages = () => {
  const [adventurePackages, setAdventurePackages] = useState<AdventurePackage[]>([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<AdventurePackage | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<AdventurePackage | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    destination: "",
    price: "",
    originalPrice: "",
    rating: "",
    images: "",
    description: "",
    shortDescription: "",
    highlights: "",
    isActive: true
  });

  useEffect(() => {
    const fetchAdventurePackages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/adventure-packages');
        
        if (!response.ok) {
          throw new Error('Failed to fetch adventure packages');
        }
        
        const data = await response.json();
        // Extract packages array from the response
        const packagesArray = data.packages || data;
        setAdventurePackages(packagesArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching adventure packages:', err);
        setError('Failed to load adventure packages');
        setAdventurePackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventurePackages();
  }, []);

  const handleAddPackage = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        toast.error('Please log in to add packages');
        return;
      }

      // Validate required fields
      if (!formData.title.trim()) {
        toast.error('Package title is required');
        return;
      }
      if (!formData.price.trim()) {
        toast.error('Price is required');
        return;
      }
      if (!formData.duration.trim()) {
        toast.error('Duration is required');
        return;
      }
      if (!formData.destination.trim()) {
        toast.error('Destination is required');
        return;
      }

      // Parse and validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      // Parse and validate original price if provided
      let originalPrice;
      if (formData.originalPrice.trim()) {
        originalPrice = parseFloat(formData.originalPrice);
        if (isNaN(originalPrice) || originalPrice <= 0) {
          toast.error('Please enter a valid original price');
          return;
        }
      }

      // Parse and validate rating
      const rating = parseFloat(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        toast.error('Please enter a valid rating between 0 and 5');
        return;
      }

      // Check if we need to upload a file
      const hasFileUpload = formData.images && (formData.images.startsWith('blob:') || formData.images.startsWith('data:'));
      
      const packageData: PackageData = {
        title: formData.title.trim(),
        duration: formData.duration.trim(),
        destination: formData.destination.trim(),
        price: price,
        originalPrice: originalPrice,
        rating: rating,
        images: formData.images.split(',').map(img => img.trim()).filter(img => img),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h),
        isActive: formData.isActive
      };

      let response;
      if (hasFileUpload) {
        // Handle file upload
        const uploadFormData = new FormData();
        
        // Add all form fields
        Object.keys(packageData).forEach(key => {
          const value = packageData[key as keyof PackageData];
          if (key === 'images' && Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' && value[0].startsWith('blob:')) {
            // Convert blob URL to file and upload
            fetch(value[0])
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                uploadFormData.append('image', file);
              });
          } else if (key === 'images' && Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' && value[0].startsWith('data:')) {
            // Convert data URL to file and upload
            const response = fetch(value[0]);
            response.then(res => res.blob())
              .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                uploadFormData.append('image', file);
              });
          } else if (Array.isArray(value)) {
            uploadFormData.append(key, JSON.stringify(value));
          } else {
            uploadFormData.append(key, String(value));
          }
        });

        response = await fetch('/api/adventure-packages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: uploadFormData,
        });
      } else {
        // Handle regular JSON data
        response = await fetch('/api/adventure-packages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(packageData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        // Refresh the packages list
        const refreshResponse = await fetch('/api/adventure-packages');
        const refreshData = await refreshResponse.json();
        const packagesArray = refreshData.packages || refreshData;
        setAdventurePackages(packagesArray);
        resetForm();
        toast.success('Adventure package added successfully!');
      } else {
        toast.error(`Failed to add package: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding package:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleEditPackage = (pkg: AdventurePackage) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      duration: pkg.duration,
      destination: pkg.destination,
      price: pkg.price.toString(),
      originalPrice: pkg.originalPrice?.toString() || "",
      rating: pkg.rating.toString(),
      images: pkg.images.join(', '),
      description: pkg.description,
      shortDescription: pkg.shortDescription,
      highlights: pkg.highlights.join(', '),
      isActive: pkg.isActive
    });
    setShowAddForm(true);
  };

  const handleUpdatePackage = async () => {
    if (!editingPackage) return;

    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        toast.error('Please log in to update packages');
        return;
      }

      // Validate required fields
      if (!formData.title.trim()) {
        toast.error('Package title is required');
        return;
      }
      if (!formData.price.trim()) {
        toast.error('Price is required');
        return;
      }
      if (!formData.duration.trim()) {
        toast.error('Duration is required');
        return;
      }
      if (!formData.destination.trim()) {
        toast.error('Destination is required');
        return;
      }

      // Parse and validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error('Please enter a valid price');
        return;
      }

      // Parse and validate original price if provided
      let originalPrice;
      if (formData.originalPrice.trim()) {
        originalPrice = parseFloat(formData.originalPrice);
        if (isNaN(originalPrice) || originalPrice <= 0) {
          toast.error('Please enter a valid original price');
          return;
        }
      }

      // Parse and validate rating
      const rating = parseFloat(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        toast.error('Please enter a valid rating between 0 and 5');
        return;
      }

      // Check if we need to upload a file
      const hasFileUpload = formData.images && (formData.images.startsWith('blob:') || formData.images.startsWith('data:'));
      
      const packageData: PackageData = {
        title: formData.title.trim(),
        duration: formData.duration.trim(),
        destination: formData.destination.trim(),
        price: price,
        originalPrice: originalPrice,
        rating: rating,
        images: formData.images.split(',').map((img: string) => img.trim()).filter(img => img),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        highlights: formData.highlights.split(',').map((h: string) => h.trim()).filter(h => h),
        isActive: formData.isActive
      };

      let response;
      if (hasFileUpload) {
        // Handle file upload
        const uploadFormData = new FormData();
        
        // Add all form fields
        Object.keys(packageData).forEach(key => {
          const value = packageData[key as keyof PackageData];
          if (key === 'images' && Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' && value[0].startsWith('blob:')) {
            // Convert blob URL to file and upload
            fetch(value[0])
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                uploadFormData.append('image', file);
              });
          } else if (key === 'images' && Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' && value[0].startsWith('data:')) {
            // Convert data URL to file and upload
            const response = fetch(value[0]);
            response.then(res => res.blob())
              .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                uploadFormData.append('image', file);
              });
          } else if (Array.isArray(value)) {
            uploadFormData.append(key, JSON.stringify(value));
          } else {
            uploadFormData.append(key, String(value));
          }
        });

        response = await fetch(`/api/adventure-packages/${editingPackage._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: uploadFormData,
        });
      } else {
        // Handle regular JSON data
        response = await fetch(`/api/adventure-packages/${editingPackage._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(packageData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        // Refresh the packages list
        const refreshResponse = await fetch('/api/adventure-packages');
        const refreshData = await refreshResponse.json();
        const packagesArray = refreshData.packages || refreshData;
        setAdventurePackages(packagesArray);
        setEditingPackage(null);
        resetForm();
        toast.success('Adventure package updated successfully!');
      } else {
        toast.error(`Failed to update package: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (confirm('Are you sure you want to delete this adventure package?')) {
      try {
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          toast.error('Please log in to delete packages');
          return;
        }
        
        const response = await fetch(`/api/adventure-packages/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Refresh the packages list
          const refreshResponse = await fetch('/api/adventure-packages');
          const refreshData = await refreshResponse.json();
          const packagesArray = refreshData.packages || refreshData;
          setAdventurePackages(packagesArray);
          toast.success('Adventure package deleted successfully!');
        } else {
          toast.error(`Failed to delete package: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        toast.error('Network error. Please try again.');
      }
    }
  };

  const togglePackageStatus = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        toast.error('Please log in to update package status');
        return;
      }

      const packageToUpdate = adventurePackages.find(pkg => pkg._id === id);
      if (!packageToUpdate) return;

      const response = await fetch(`/api/adventure-packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...packageToUpdate,
          isActive: !packageToUpdate.isActive
        }),
      });

      if (response.ok) {
        // Refresh the packages list
        const refreshResponse = await fetch('/api/adventure-packages');
        const refreshData = await refreshResponse.json();
        const packagesArray = refreshData.packages || refreshData;
        setAdventurePackages(packagesArray);
      } else {
        toast.error('Failed to update package status');
      }
    } catch (error) {
      console.error('Error updating package status:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      duration: "",
      destination: "",
      price: "",
      originalPrice: "",
      rating: "",
      images: "",
      description: "",
      shortDescription: "",
      highlights: "",
      isActive: true
    });
    setShowAddForm(false);
    setEditingPackage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Mountain className="w-8 h-8 text-green-600" />
            Adventure Packages
          </h1>
          <p className="text-gray-600">Manage your thrilling adventure travel packages and expeditions.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Adventure Package
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mountain className="w-5 h-5 text-green-600" />
            {editingPackage ? "Edit Adventure Package" : "Add New Adventure Package"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Himalayan Trekking"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 10N-11D"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Nepal Himalayas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., ₹45,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
              <input
                type="text"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., ₹55,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="text"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 4.8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Mountain adventure with expert guides"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Highlights (comma-separated)</label>
              <input
                type="text"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Expert Guides, Camping, Mountain Views, Local Culture"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Status</label>
              <select
                value={formData.isActive ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                value={formData.images}
                onChange={(value) => setFormData({ ...formData, images: value })}
                label="Package Image"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Enter package description..."
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={editingPackage ? handleUpdatePackage : handleAddPackage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {editingPackage ? "Update Package" : "Add Package"}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Packages</p>
              <p className="text-2xl font-bold">{adventurePackages.length}</p>
            </div>
            <Mountain className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Active Packages</p>
              <p className="text-2xl font-bold">{adventurePackages.filter(p => p.isActive).length}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Highlights</p>
              <p className="text-2xl font-bold">{adventurePackages.reduce((sum, p) => sum + (p.highlights?.length || 0), 0).toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Avg Rating</p>
              <p className="text-2xl font-bold">
                {(adventurePackages.reduce((sum, p) => sum + p.rating, 0) / adventurePackages.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Packages List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Adventure Packages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adventurePackages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded overflow-hidden relative">
                        <Image 
                          src={getImageUrl(pkg.images?.[0]) || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                          alt={pkg.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                        <div className="text-xs text-gray-500">Adventure</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      {pkg.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      {pkg.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-semibold text-green-600">₹{pkg.price?.toLocaleString()}</div>
                      {pkg.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Adventure
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      {pkg.highlights?.length || 0} highlights
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePackageStatus(pkg._id)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pkg.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.isActive ? "active" : "inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className="text-blue-600 hover:text-blue-900 hover:cursor-pointer hover:scale-105 transition-transform"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="text-green-600 hover:text-green-900 hover:cursor-pointer hover:scale-105 transition-transform"
                        title="Edit Package"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg._id)}
                        className="text-red-600 hover:text-red-900 hover:cursor-pointer hover:scale-105 transition-transform"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Package Details</h3>
              <button
                onClick={() => setSelectedPackage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="w-full h-48 rounded-lg overflow-hidden relative">
                <Image 
                  src={getImageUrl(selectedPackage.images?.[0]) || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                  alt={selectedPackage.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedPackage.title}</h4>
                <p className="text-gray-600 mt-2">{selectedPackage.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Destination:</span>
                  <p className="text-gray-900">{selectedPackage.destination}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Duration:</span>
                  <p className="text-gray-900">{selectedPackage.duration}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Price:</span>
                  <p className="text-gray-900">₹{selectedPackage.price?.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Rating:</span>
                  <p className="text-gray-900">{selectedPackage.rating}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <p className="text-gray-900">{selectedPackage.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <p className="text-gray-900">{selectedPackage.isActive ? "Active" : "Inactive"}</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Highlights:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPackage.highlights?.map((highlight: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdventurePackages; 