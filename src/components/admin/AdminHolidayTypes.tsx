"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { toast } from "react-toastify";
import ImageUpload from "@/components/ui/image-upload";
import { getImageUrl } from "@/lib/utils";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  ArrowUp,
  ArrowDown,
  Save,
  X
} from "lucide-react";
import Image from "next/image";

interface HolidayType {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  bgColor: string;
  duration: string;
  travelers: string;
  badge: string;
  price: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const AdminHolidayTypes = () => {
  const [holidayTypes, setHolidayTypes] = useState<HolidayType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    image: "",
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    duration: "",
    travelers: "",
    badge: "",
    price: "",
    order: 0
  });

  const fetchHolidayTypes = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/holiday-types/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch holiday types");
      }

      const data = await response.json();
      setHolidayTypes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidayTypes();
  }, []);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        toast.error("No admin token found. Please log in again.");
        return;
      }
      
      console.log("Token present:", !!token);

      // Check if we need to upload a file
      const hasFileUpload = formData.image && (formData.image.startsWith('blob:') || formData.image.startsWith('data:'));
      
      let response;
      if (hasFileUpload) {
        // Handle file upload
        const uploadFormData = new FormData();
        
        // Add all form fields
        Object.keys(formData).forEach(key => {
          const value = (formData as Record<string, unknown>)[key];
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
          } else {
            uploadFormData.append(key, String(value));
          }
        });

        response = await fetch("/api/holiday-types", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadFormData,
        });
      } else {
        // Handle regular JSON data
        response = await fetch("/api/holiday-types", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create holiday type");
      }

      await fetchHolidayTypes();
      resetForm();
      toast.success("Holiday type created successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        toast.error("No admin token found. Please log in again.");
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
          const value = (formData as Record<string, unknown>)[key];
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
          } else {
            uploadFormData.append(key, String(value));
          }
        });

        response = await fetch(`/api/holiday-types/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadFormData,
        });
      } else {
        // Handle regular JSON data
        response = await fetch(`/api/holiday-types/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update holiday type");
      }

      await fetchHolidayTypes();
      setEditingId(null);
      resetForm();
      toast.success("Holiday type updated successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/holiday-types/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete holiday type");
      }

      await fetchHolidayTypes();
      setDeleteId(null);
      toast.success("Holiday type deleted successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/holiday-types/${id}/toggle-status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle status");
      }

      await fetchHolidayTypes();
      toast.success("Holiday type status toggled successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const toggleFeatured = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/holiday-types/${id}/toggle-featured`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle featured status");
      }

      await fetchHolidayTypes();
      toast.success("Holiday type featured status toggled successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const updateOrder = async (id: string, newOrder: number) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/holiday-types/${id}/order`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: newOrder }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      await fetchHolidayTypes();
      toast.success("Holiday type order updated successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      shortDescription: "",
      image: "",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      duration: "",
      travelers: "",
      badge: "",
      price: "",
      order: 0
    });
  };

  const handleEdit = (holidayType: HolidayType) => {
    setEditingId(holidayType._id);
    setFormData({
      title: holidayType.title,
      description: holidayType.description,
      shortDescription: holidayType.shortDescription,
      image: holidayType.image,
      bgColor: holidayType.bgColor,
      duration: holidayType.duration,
      travelers: holidayType.travelers,
      badge: holidayType.badge,
      price: holidayType.price,
      order: holidayType.order
    });
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingId(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Holiday Types Management</h1>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Holiday Type
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Create/Edit Form */}
      {(showCreateForm || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Holiday Type" : "Create New Holiday Type"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Beach Holidays"
                  className="bg-white"
                />
              </div>
              <div>
                <ImageUpload
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value })}
                  label="Holiday Type Image"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="5-7 Days"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Travelers
                </label>
                <Input
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  placeholder="2,500+"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Badge
                </label>
                <Input
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Popular"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="From ₹45,000"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <Input
                  value={formData.bgColor}
                  onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                  placeholder="bg-gradient-to-br from-blue-400 to-blue-600"
                  className="bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <Textarea
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Discover pristine beaches and crystal-clear waters..."
                rows={2}
                className="bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of the holiday type..."
                rows={4}
                className="bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Create"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Holiday Types List */}
      <div className="grid gap-4">
        {holidayTypes.map((holidayType) => (
          <Card key={holidayType._id} className="relative">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                    <Image 
                      src={getImageUrl(holidayType.image)} 
                      alt={holidayType.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {holidayType.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {holidayType.shortDescription}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={holidayType.isActive ? "default" : "secondary"}>
                        {holidayType.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {holidayType.isFeatured && (
                        <Badge variant="default" className="bg-yellow-500">
                          Featured
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500">
                        Order: {holidayType.order}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(holidayType._id)}
                    title={holidayType.isActive ? "Deactivate" : "Activate"}
                    className="bg-white/80 "
                  >
                    {holidayType.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFeatured(holidayType._id)}
                    title={holidayType.isFeatured ? "Remove from featured" : "Mark as featured"}
                    className="bg-white/80 "
                  >
                    {holidayType.isFeatured ? (
                      <Star className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <StarOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateOrder(holidayType._id, holidayType.order - 1)}
                    disabled={holidayType.order === 0}
                    className="bg-white/80 "
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateOrder(holidayType._id, holidayType.order + 1)}
                    className="bg-white/80 "
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(holidayType)}
                    className="bg-white/80 "
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteId(holidayType._id)}
                    className="bg-white/80 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Holiday Type"
        message="Are you sure you want to delete this holiday type? This action cannot be undone."
      />
    </div>
  );
};

export default AdminHolidayTypes; 