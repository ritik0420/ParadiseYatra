"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  MapPin,
  Clock,
  Utensils,
  Hotel,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
  accommodation: string;
  meals: string;
  image: string;
}

interface Package {
  _id: string;
  title: string;
  slug: string;
  itinerary: DayItinerary[];
  category: string;
  duration: string;
  destination: string;
}

const AdminItinerary = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDay, setEditingDay] = useState<DayItinerary | null>(null);
  const [isAddingDay, setIsAddingDay] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newDay, setNewDay] = useState<Partial<DayItinerary>>({
    day: 1,
    title: "",
    activities: [""],
    accommodation: "",
    meals: "",
    image: ""
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/packages');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setPackages(data.packages || data);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setError('Failed to load packages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePackageSelect = (packageId: string) => {
    const pkg = packages.find(p => p._id === packageId);
    setSelectedPackage(pkg || null);
    setIsEditing(false);
    setEditingDay(null);
    setIsAddingDay(false);
    setError(null);
    setSuccess(null);
    // Reset newDay state when selecting a new package
    setNewDay({
      day: 1,
      title: "",
      activities: [""],
      accommodation: "",
      meals: "",
      image: ""
    });
  };

  const handleEditDay = (day: DayItinerary) => {
    setEditingDay({ 
      ...day, 
      activities: day.activities || [""] 
    });
    setIsEditing(true);
    setError(null);
  };

  const handleSaveDay = async () => {
    if (!selectedPackage || !editingDay) return;

    try {
      setIsSaving(true);
      setError(null);
      
      const updatedItinerary = selectedPackage.itinerary.map(day => 
        day.day === editingDay.day ? editingDay : day
      );

      const response = await fetch(`/api/packages/${selectedPackage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          itinerary: updatedItinerary
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update day');
      }

      const updatedPackage = await response.json();
      setSelectedPackage(updatedPackage.package);
      setIsEditing(false);
      setEditingDay(null);
      setSuccess('Day updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error updating day:', error);
      setError(error instanceof Error ? error.message : 'Failed to update day');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDay = async (dayNumber: number) => {
    if (!selectedPackage) return;

    if (!confirm(`Are you sure you want to delete Day ${dayNumber}?`)) {
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      const updatedItinerary = selectedPackage.itinerary
        .filter(day => day.day !== dayNumber)
        .map((day, index) => ({ ...day, day: index + 1 }));

      const response = await fetch(`/api/packages/${selectedPackage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          itinerary: updatedItinerary
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete day');
      }

      const updatedPackage = await response.json();
      setSelectedPackage(updatedPackage.package);
      setSuccess('Day deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting day:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete day');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDay = async () => {
    if (!selectedPackage || !newDay.title || !newDay.accommodation || !newDay.meals) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      
      const dayToAdd: DayItinerary = {
        day: selectedPackage.itinerary.length + 1,
        title: newDay.title!,
        activities: (newDay.activities || [""]).filter(activity => activity.trim() !== ""),
        accommodation: newDay.accommodation!,
        meals: newDay.meals!,
        image: newDay.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      };

      const updatedItinerary = [...selectedPackage.itinerary, dayToAdd];

      const response = await fetch(`/api/packages/${selectedPackage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          itinerary: updatedItinerary
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add day');
      }

      const updatedPackage = await response.json();
      setSelectedPackage(updatedPackage.package);
      setIsAddingDay(false);
      setNewDay({
        day: 1,
        title: "",
        activities: [""],
        accommodation: "",
        meals: "",
        image: ""
      });
      setSuccess('Day added successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error adding day:', error);
      setError(error instanceof Error ? error.message : 'Failed to add day');
    } finally {
      setIsSaving(false);
    }
  };

  const addActivityField = () => {
    setNewDay(prev => ({
      ...prev,
      activities: [...(prev.activities || [""]), ""]
    }));
  };

  const updateActivity = (index: number, value: string) => {
    setNewDay(prev => ({
      ...prev,
      activities: (prev.activities || [""]).map((activity, i) => i === index ? value : activity)
    }));
  };

  const removeActivity = (index: number) => {
    setNewDay(prev => ({
      ...prev,
      activities: (prev.activities || [""]).filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Itinerary Management</h1>
          <p className="text-gray-600 mt-2">Manage day-wise itineraries for your travel packages</p>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Package Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Select Package</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            onChange={(e) => handlePackageSelect(e.target.value)}
            className="w-full text-gray-900 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a package to manage itinerary</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.title} - {pkg.category} ({pkg.duration})
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {selectedPackage && (
        <div className="space-y-6">
          {/* Package Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedPackage.title}</span>
                <Badge variant="secondary">
                  {selectedPackage.itinerary.length} Days
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {selectedPackage.destination}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedPackage.duration}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {selectedPackage.itinerary.length} Days
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Add New Day Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => setIsAddingDay(true)}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSaving}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Day
            </Button>
          </div>

          {/* Add New Day Form */}
          {isAddingDay && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900">
                  <span>Add New Day</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingDay(false)}
                    disabled={isSaving}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Day Title *
                    </label>
                    <Input
                      value={newDay.title}
                      onChange={(e) => setNewDay(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Arrival in Jaipur - The Pink City"
                      disabled={isSaving}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Day Number
                    </label>
                    <Input
                      type="number"
                      value={newDay.day}
                      onChange={(e) => setNewDay(prev => ({ ...prev, day: parseInt(e.target.value) }))}
                      min={1}
                      disabled={isSaving}
                      className="text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Activities
                  </label>
                  <div className="space-y-2">
                    {newDay.activities && newDay.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={activity}
                          onChange={(e) => updateActivity(index, e.target.value)}
                          placeholder={`Activity ${index + 1}`}
                          disabled={isSaving}
                          className="text-white"
                        />
                        {newDay.activities && newDay.activities.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeActivity(index)}
                            disabled={isSaving}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addActivityField}
                      disabled={isSaving}
                      className="text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Accommodation *
                    </label>
                    <Input
                      value={newDay.accommodation}
                      onChange={(e) => setNewDay(prev => ({ ...prev, accommodation: e.target.value }))}
                      placeholder="e.g., Heritage Palace Hotel, Jaipur"
                      disabled={isSaving}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Meals *
                    </label>
                    <Input
                      value={newDay.meals}
                      onChange={(e) => setNewDay(prev => ({ ...prev, meals: e.target.value }))}
                      placeholder="e.g., Breakfast, Lunch, Dinner"
                      disabled={isSaving}
                      className="text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Image URL (Optional)
                  </label>
                  <Input
                    value={newDay.image}
                    onChange={(e) => setNewDay(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    disabled={isSaving}
                    className="text-white"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingDay(false)}
                    disabled={isSaving}
                    className="text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddDay}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Add Day
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Itinerary Days */}
          <div className="space-y-4">
            {selectedPackage.itinerary.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Itinerary Days</h3>
                  <p className="text-gray-600 mb-4">This package doesn't have any itinerary days yet.</p>
                  <Button
                    onClick={() => setIsAddingDay(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Day
                  </Button>
                </CardContent>
              </Card>
            ) : (
              selectedPackage.itinerary.map((day, index) => (
                <Card key={day.day} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-lg font-semibold">
                          Day {day.day}
                        </Badge>
                        <h3 className="text-xl font-semibold">{day.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditDay(day)}
                          className="hover:cursor-pointer hover:scale-105 transition-transform"
                          disabled={isSaving}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDay(day.day)}
                          className="text-red-600 hover:text-red-700"
                          disabled={isSaving}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Hotel className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{day.accommodation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Utensils className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{day.meals}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{(day.activities || []).length} Activities</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Activities:</h4>
                      <ul className="space-y-1">
                        {(day.activities || []).map((activity, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Edit Day Modal */}
      {isEditing && editingDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Day {editingDay.day}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Day Title
                </label>
                <Input
                  value={editingDay.title}
                  onChange={(e) => setEditingDay(prev => prev ? { ...prev, title: e.target.value } : null)}
                  disabled={isSaving}
                  className="text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Activities
                </label>
                <div className="space-y-2">
                  {(editingDay.activities || []).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={activity}
                        onChange={(e) => {
                          const newActivities = [...(editingDay.activities || [])];
                          newActivities[index] = e.target.value;
                          setEditingDay(prev => prev ? { ...prev, activities: newActivities } : null);
                        }}
                        disabled={isSaving}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newActivities = (editingDay.activities || []).filter((_, i) => i !== index);
                          setEditingDay(prev => prev ? { ...prev, activities: newActivities } : null);
                        }}
                        disabled={isSaving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingDay(prev => prev ? { ...prev, activities: [...(prev.activities || []), ""] } : null);
                    }}
                    disabled={isSaving}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Accommodation
                  </label>
                  <Input
                    value={editingDay.accommodation}
                    onChange={(e) => setEditingDay(prev => prev ? { ...prev, accommodation: e.target.value } : null)}
                    disabled={isSaving}
                    className="text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Meals
                  </label>
                  <Input
                    value={editingDay.meals}
                    onChange={(e) => setEditingDay(prev => prev ? { ...prev, meals: e.target.value } : null)}
                    disabled={isSaving}
                    className="text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Image URL
                </label>
                <Input
                  value={editingDay.image}
                  onChange={(e) => setEditingDay(prev => prev ? { ...prev, image: e.target.value } : null)}
                  disabled={isSaving}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveDay}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminItinerary; 