"use client";

import { useState } from "react";
import { Mountain, Star, MapPin, Clock, Users, Edit, Trash2, Plus, Eye, Zap } from "lucide-react";

interface AdventurePackage {
  id: string;
  title: string;
  duration: string;
  location: string;
  price: string;
  originalPrice: string;
  rating: string;
  image: string;
  badge: string;
  description: string;
  booked: number;
  difficulty: string;
  altitude: string;
  features: string[];
  status: "active" | "inactive";
}

const AdminAdventurePackages = () => {
  const [adventurePackages, setAdventurePackages] = useState<AdventurePackage[]>([
    {
      id: "1",
      title: "Himalayan Trekking",
      duration: "10N-11D",
      location: "Nepal Himalayas",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Adventure",
      description: "Conquer the mighty Himalayas with expert guides and breathtaking mountain views",
      booked: 1200,
      difficulty: "Moderate",
      altitude: "5,500m",
      features: ["Expert Guides", "Camping", "Mountain Views", "Local Culture"],
      status: "active"
    },
    {
      id: "2",
      title: "Amazon Jungle Safari",
      duration: "8N-9D",
      location: "Brazil",
      price: "₹85,000",
      originalPrice: "₹1,00,000",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Wildlife",
      description: "Explore the world's largest rainforest with wildlife encounters and river adventures",
      booked: 850,
      difficulty: "Easy",
      altitude: "Sea Level",
      features: ["Wildlife Safari", "River Cruise", "Jungle Lodge", "Bird Watching"],
      status: "active"
    },
    {
      id: "3",
      title: "Patagonia Expedition",
      duration: "12N-13D",
      location: "Argentina & Chile",
      price: "₹1,25,000",
      originalPrice: "₹1,45,000",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Expedition",
      description: "Trek through the stunning landscapes of Patagonia with glaciers and fjords",
      booked: 650,
      difficulty: "Challenging",
      altitude: "3,000m",
      features: ["Glacier Trek", "Fjord Cruise", "Mountain Hiking", "Wild Camping"],
      status: "active"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<AdventurePackage | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<AdventurePackage | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    location: "",
    price: "",
    originalPrice: "",
    rating: "",
    image: "",
    badge: "",
    description: "",
    booked: "",
    difficulty: "",
    altitude: "",
    features: "",
    status: "active"
  });

  const handleAddPackage = () => {
    const newPackage: AdventurePackage = {
      id: Date.now().toString(),
      title: formData.title,
      duration: formData.duration,
      location: formData.location,
      price: formData.price,
      originalPrice: formData.originalPrice,
      rating: formData.rating,
      image: formData.image,
      badge: formData.badge,
      description: formData.description,
      booked: parseInt(formData.booked),
      difficulty: formData.difficulty,
      altitude: formData.altitude,
      features: formData.features.split(',').map(f => f.trim()),
      status: formData.status as "active" | "inactive"
    };

    setAdventurePackages([...adventurePackages, newPackage]);
    resetForm();
  };

  const handleEditPackage = (pkg: AdventurePackage) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      duration: pkg.duration,
      location: pkg.location,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      rating: pkg.rating,
      image: pkg.image,
      badge: pkg.badge,
      description: pkg.description,
      booked: pkg.booked.toString(),
      difficulty: pkg.difficulty,
      altitude: pkg.altitude,
      features: pkg.features.join(', '),
      status: pkg.status
    });
    setShowAddForm(true);
  };

  const handleUpdatePackage = () => {
    if (!editingPackage) return;

    const updatedPackages = adventurePackages.map((pkg) =>
      pkg.id === editingPackage.id
        ? {
            ...pkg,
            title: formData.title,
            duration: formData.duration,
            location: formData.location,
            price: formData.price,
            originalPrice: formData.originalPrice,
            rating: formData.rating,
            image: formData.image,
            badge: formData.badge,
            description: formData.description,
            booked: parseInt(formData.booked),
            difficulty: formData.difficulty,
            altitude: formData.altitude,
            features: formData.features.split(',').map(f => f.trim()),
            status: formData.status as "active" | "inactive"
          }
        : pkg
    );

    setAdventurePackages(updatedPackages);
    setEditingPackage(null);
    resetForm();
  };

  const handleDeletePackage = (id: string) => {
    setAdventurePackages(adventurePackages.filter((pkg) => pkg.id !== id));
  };

  const togglePackageStatus = (id: string) => {
    setAdventurePackages(
      adventurePackages.map((pkg) =>
        pkg.id === id
          ? { ...pkg, status: pkg.status === "active" ? "inactive" : "active" }
          : pkg
      )
    );
  };

  const resetForm = () => {
    setFormData({
      title: "",
      duration: "",
      location: "",
      price: "",
      originalPrice: "",
      rating: "",
      image: "",
      badge: "",
      description: "",
      booked: "",
      difficulty: "",
      altitude: "",
      features: "",
      status: "active"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
              <select
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select badge</option>
                <option value="Adventure">Adventure</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Expedition">Expedition</option>
                <option value="Trekking">Trekking</option>
                <option value="Safari">Safari</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Altitude</label>
              <input
                type="text"
                value={formData.altitude}
                onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 5,500m"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booked Count</label>
              <input
                type="number"
                value={formData.booked}
                onChange={(e) => setFormData({ ...formData, booked: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 1200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://images.unsplash.com/..."
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Expert Guides, Camping, Mountain Views, Local Culture"
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
              <p className="text-2xl font-bold">{adventurePackages.filter(p => p.status === 'active').length}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Bookings</p>
              <p className="text-2xl font-bold">{adventurePackages.reduce((sum, p) => sum + p.booked, 0).toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Avg Rating</p>
              <p className="text-2xl font-bold">
                {(adventurePackages.reduce((sum, p) => sum + parseFloat(p.rating), 0) / adventurePackages.length).toFixed(1)}
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
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                        <div className="text-xs text-gray-500">{pkg.badge}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      {pkg.location}
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
                      <div className="font-semibold text-green-600">{pkg.price}</div>
                      <div className="text-xs text-gray-400 line-through">{pkg.originalPrice}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pkg.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      pkg.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      pkg.difficulty === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {pkg.difficulty}
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
                      {pkg.booked.toLocaleString()}+
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePackageStatus(pkg.id)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pkg.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.status}
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
                        onClick={() => handleDeletePackage(pkg.id)}
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
              <img 
                src={selectedPackage.image} 
                alt={selectedPackage.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedPackage.title}</h4>
                <p className="text-gray-600 mt-2">{selectedPackage.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Location:</span>
                  <p className="text-gray-900">{selectedPackage.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Duration:</span>
                  <p className="text-gray-900">{selectedPackage.duration}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Price:</span>
                  <p className="text-gray-900">{selectedPackage.price}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Rating:</span>
                  <p className="text-gray-900">{selectedPackage.rating}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Difficulty:</span>
                  <p className="text-gray-900">{selectedPackage.difficulty}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Altitude:</span>
                  <p className="text-gray-900">{selectedPackage.altitude}</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Features:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPackage.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {feature}
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