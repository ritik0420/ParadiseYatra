"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Plus, Trash2, MapPin, Package } from "lucide-react";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import ImageUpload from "@/components/ui/image-upload";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

interface Destination {
  _id?: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  duration: string;
  highlights: string[];
  isActive: boolean;
  isTrending: boolean;
  visitCount: number;
}

interface Package {
  _id?: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  status: "active" | "inactive";
  image: string;
  shortDescription?: string;
  description?: string;
  images?: string[];
  rating?: number;
  reviews?: unknown[];
  isActive: boolean;
}

const AdminPopularDestinations = () => {
  const [activeTab, setActiveTab] = useState<'destinations' | 'packages'>('destinations');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: string | null;
    itemType: string;
    itemName: string;
  }>({
    isOpen: false,
    id: null,
    itemType: '',
    itemName: ''
  });

  const [destinationFormData, setDestinationFormData] = useState<Destination>({
    name: "",
    description: "",
    shortDescription: "",
    image: "",
    location: "",
    rating: 0,
    price: 0,
    duration: "",
    highlights: [],
    isActive: true,
    isTrending: false,
    visitCount: 0
  });

  const [packageFormData, setPackageFormData] = useState<Package>({
    title: "",
    destination: "",
    duration: "",
    price: 0,
    originalPrice: 0,
    category: "",
    status: "active",
    image: "",
    shortDescription: "",
    description: "",
    images: [],
    rating: 0,
    reviews: [],
    isActive: true
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([fetchDestinations(), fetchPackages()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/destinations');
      if (response.ok) {
        const data = await response.json();
        const destinationsArray = data.destinations || [];
        setDestinations(destinationsArray);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      if (response.ok) {
        const data = await response.json();
        const packagesArray = Array.isArray(data) ? data : (data.packages || []);
        setPackages(packagesArray);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const isDestination = activeTab === 'destinations';
      const formData = isDestination ? destinationFormData : packageFormData;
      const method = editing ? 'PUT' : 'POST';
      const url = editing 
        ? `/${isDestination ? 'api/destinations' : 'api/packages'}/${editing}` 
        : `/${isDestination ? 'api/destinations' : 'api/packages'}`;
      
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        toast.error('Please log in to save changes');
        return;
      }

      // Check if we need to upload a file
      const hasFileUpload = formData.image && (formData.image.startsWith('blob:') || formData.image.startsWith('data:'));
      
      let response;
      if (hasFileUpload) {
        // Handle file upload
        const uploadFormData = new FormData();
        
        // Add all form fields
        Object.keys(formData).forEach(key => {
          const value = (formData as unknown as Record<string, unknown>)[key];
          if (key === 'image' && typeof value === 'string' && value.startsWith('blob:')) {
            // Convert blob URL to file and upload
            fetch(value)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                uploadFormData.append('image', file);
              });
          } else if (key === 'image' && typeof value === 'string' && value.startsWith('data:')) {
            // Convert data URL to file and upload
            const response = fetch(value);
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

        response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: uploadFormData,
        });
      } else {
        // Handle regular JSON data
        response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok) {
        await fetchData();
        setEditing(null);
        setShowForm(false);
        resetForm();
        const itemType = isDestination ? 'Destination' : 'Package';
        const action = editing ? 'updated' : 'added';
        toast.success(`${itemType} ${action} successfully!`);
      } else {
        console.error('Failed to save:', data.message);
        toast.error(`Failed to save: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: Destination | Package) => {
    setEditing(item._id || '');
    if (activeTab === 'destinations') {
      setDestinationFormData(item as Destination);
    } else {
      setPackageFormData(item as Package);
    }
    setShowForm(true);
  };

  const handleDelete = async (id: string, itemName: string) => {
    const itemType = activeTab === 'destinations' ? 'destination' : 'package';
    setDeleteDialog({
      isOpen: true,
      id,
      itemType,
      itemName
    });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.id) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        toast.error(`Please log in to delete ${deleteDialog.itemType}s`);
        return;
      }
      
      const url = activeTab === 'destinations' 
        ? `/api/destinations/${deleteDialog.id}` 
        : `/api/packages/${deleteDialog.id}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        await fetchData();
        const itemType = deleteDialog.itemType.charAt(0).toUpperCase() + deleteDialog.itemType.slice(1);
        toast.success(`${itemType} deleted successfully!`);
      } else {
        console.error(`Failed to delete ${deleteDialog.itemType}:`, data.message);
        toast.error(`Failed to delete: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error deleting ${deleteDialog.itemType}:`, error);
      toast.error('Network error. Please try again.');
    } finally {
      setDeleteDialog({
        isOpen: false,
        id: null,
        itemType: '',
        itemName: ''
      });
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setDestinationFormData({
      name: "",
      description: "",
      shortDescription: "",
      image: "",
      location: "",
      rating: 0,
      price: 0,
      duration: "",
      highlights: [],
      isActive: true,
      isTrending: false,
      visitCount: 0
    });
    setPackageFormData({
      title: "",
      destination: "",
      duration: "",
      price: 0,
      originalPrice: 0,
      category: "",
      status: "active",
      image: "",
      shortDescription: "",
      description: "",
      images: [],
      rating: 0,
      reviews: [],
      isActive: true
    });
  };

  const handleAddNew = () => {
    setEditing(null);
    setShowForm(true);
    resetForm();
  };

  const renderDestinationForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit Destination' : 'Add New Destination'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Name
            </label>
            <Input
              value={destinationFormData.name}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Manali"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Input
              value={destinationFormData.location}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Himachal Pradesh, India"
              className="bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <Input
              value={destinationFormData.duration}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="3 Days"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <Input
              type="number"
              value={destinationFormData.price}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              placeholder="15000"
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
              value={destinationFormData.rating}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
              placeholder="4.8"
              className="bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <Input
            value={destinationFormData.shortDescription}
            onChange={(e) => setDestinationFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
            placeholder="Scenic mountain destination"
            className="bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description
          </label>
          <Textarea
            value={destinationFormData.description}
            onChange={(e) => setDestinationFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Detailed description of the destination"
            rows={3}
            className="bg-white"
          />
        </div>

        <ImageUpload
          value={destinationFormData.image}
          onChange={(value) => setDestinationFormData(prev => ({ ...prev, image: value }))}
          label="Destination Image"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highlights (comma-separated)
          </label>
          <Input
            value={destinationFormData.highlights?.join(', ') || ''}
            onChange={(e) => setDestinationFormData(prev => ({ 
              ...prev, 
              highlights: e.target.value.split(',').map(item => item.trim()).filter(item => item)
            }))}
            placeholder="Solang Valley, Hadimba Temple, Rohtang Pass"
            className="bg-white"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={destinationFormData.isActive}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={destinationFormData.isTrending}
              onChange={(e) => setDestinationFormData(prev => ({ ...prev, isTrending: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Trending</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );

  const renderPackageForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{editing ? 'Edit Package' : 'Add New Package'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Title
            </label>
            <Input
              value={packageFormData.title}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Maldives Paradise"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <Input
              value={packageFormData.destination}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, destination: e.target.value }))}
              placeholder="Maldives"
              className="bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <Input
              value={packageFormData.duration}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="7 Days"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <Input
              type="number"
              value={packageFormData.price}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              placeholder="2500"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price
            </label>
            <Input
              type="number"
              value={packageFormData.originalPrice}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
              placeholder="3000"
              className="bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Input
              value={packageFormData.category}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Premium"
              className="bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={packageFormData.status}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, status: e.target.value as "active" | "inactive" }))}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <Input
            value={packageFormData.shortDescription}
            onChange={(e) => setPackageFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
            placeholder="Experience paradise in the Maldives..."
            className="bg-white"
          />
        </div>

        <ImageUpload
          value={packageFormData.image}
          onChange={(value) => setPackageFormData(prev => ({ ...prev, image: value }))}
          label="Package Image"
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={packageFormData.isActive}
              onChange={(e) => setPackageFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({
          isOpen: false,
          id: null,
          itemType: '',
          itemName: ''
        })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteDialog.itemType.charAt(0).toUpperCase() + deleteDialog.itemType.slice(1)}`}
        message={`Are you sure you want to delete "${deleteDialog.itemName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Popular Destinations & Packages Management</h2>
          <p className="text-gray-600">Manage popular travel destinations and packages</p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New {activeTab === 'destinations' ? 'Destination' : 'Package'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('destinations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === 'destinations'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Destinations ({destinations.length})
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === 'packages'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Package className="w-4 h-4" />
          Packages ({packages.length})
        </button>
      </div>

      {showForm && (
        <>
          {activeTab === 'destinations' ? renderDestinationForm() : renderPackageForm()}
          <div className="flex gap-3">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              variant="admin-primary"
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-gray-900" />
              {saving ? 'Saving...' : `Save ${activeTab === 'destinations' ? 'Destination' : 'Package'}`}
            </Button>
            <Button variant="admin-secondary" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2 text-gray-900" />
              Cancel
            </Button>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'destinations' ? (
          // Destinations Grid
          Array.isArray(destinations) && destinations.length > 0 ? (
            destinations.map((destination) => (
              <Card key={destination._id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                      <p className="text-sm text-gray-600">{destination.location}</p>
                      <p className="text-xs text-gray-500">{destination.duration}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {destination.isTrending && (
                        <Badge variant="default" className="text-xs">Trending</Badge>
                      )}
                      {!destination.isActive && (
                        <Badge variant="outline" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {destination.image && (
                  <div className="px-6 pb-4">
                    <Image
                      src={getImageUrl(destination.image)}
                      alt={destination.name}
                      width={128}
                      height={64}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Destination image failed to load:', destination.image);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Destination image loaded successfully:', destination.image);
                      }}
                    />
                  </div>
                )}
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Rating:</strong> {destination.rating}/5
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Price:</strong> ₹{destination.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Visits:</strong> {destination.visitCount}
                    </p>
                    {destination.shortDescription && (
                      <p className="text-sm text-gray-700 line-clamp-2">{destination.shortDescription}</p>
                    )}
                    {destination.highlights && destination.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {destination.highlights.length > 3 && (
                          <span className="text-xs text-gray-900">+{destination.highlights.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="admin-secondary"
                      onClick={() => handleEdit(destination)}
                      className="flex items-center gap-1 text-gray-900"
                    >
                      <Edit className="w-3 h-3 text-gray-900" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="admin-secondary"
                      onClick={() => destination._id && handleDelete(destination._id, destination.name)}
                      className="flex items-center gap-1 text-gray-900"
                    >
                      <Trash2 className="w-3 h-3 text-gray-900" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No destinations found. Add your first destination to get started.</p>
            </div>
          )
        ) : (
          // Packages Grid
          Array.isArray(packages) && packages.length > 0 ? (
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
                      <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>
                        {pkg.status}
                      </Badge>
                      {!pkg.isActive && (
                        <Badge variant="outline" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {pkg.image && (
                  <div className="px-6 pb-4">
                    <Image
                      src={getImageUrl(pkg.image)}
                      alt={pkg.title}
                      width={128}
                      height={64}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Package image failed to load:', pkg.image);
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Package image loaded successfully:', pkg.image);
                      }}
                    />
                  </div>
                )}
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Duration:</strong> {pkg.duration}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Category:</strong> {pkg.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Price:</strong> ${pkg.price?.toLocaleString()}
                    </p>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <p className="text-sm text-gray-500 line-through">
                        <strong>Original:</strong> ${pkg.originalPrice.toLocaleString()}
                      </p>
                    )}
                    {pkg.shortDescription && (
                      <p className="text-sm text-gray-700 line-clamp-2">{pkg.shortDescription}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="admin-secondary"
                      onClick={() => handleEdit(pkg)}
                      className="flex items-center gap-1 text-gray-900"
                    >
                      <Edit className="w-3 h-3 text-gray-900" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="admin-secondary"
                      onClick={() => pkg._id && handleDelete(pkg._id, pkg.title)}
                      className="flex items-center gap-1 text-gray-900"
                    >
                      <Trash2 className="w-3 h-3 text-gray-900" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No packages found. Add your first package to get started.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminPopularDestinations; 