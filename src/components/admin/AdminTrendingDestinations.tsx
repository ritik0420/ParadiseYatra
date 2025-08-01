"use client";

import { useState } from "react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  rating: number;
  isTrending: boolean;
}

const AdminTrendingDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: "1",
      name: "Bali",
      country: "Indonesia",
      image: "🏝️",
      description: "Tropical paradise with beautiful beaches and culture",
      rating: 4.8,
      isTrending: true,
    },
    {
      id: "2",
      name: "Santorini",
      country: "Greece",
      image: "🏛️",
      description: "Stunning white architecture and Mediterranean views",
      rating: 4.9,
      isTrending: true,
    },
    {
      id: "3",
      name: "Swiss Alps",
      country: "Switzerland",
      image: "🏔️",
      description: "Majestic mountains and world-class skiing",
      rating: 4.7,
      isTrending: false,
    },
  ]);

  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    rating: "",
    isTrending: false,
  });

  const handleEditDestination = (destination: Destination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      country: destination.country,
      description: destination.description,
      rating: destination.rating.toString(),
      isTrending: destination.isTrending,
    });
    setShowForm(true);
  };

  const handleUpdateDestination = () => {
    if (!editingDestination) return;

    const updatedDestinations = destinations.map((dest) =>
      dest.id === editingDestination.id
        ? {
            ...dest,
            name: formData.name,
            country: formData.country,
            description: formData.description,
            rating: parseFloat(formData.rating),
            isTrending: formData.isTrending,
          }
        : dest
    );

    setDestinations(updatedDestinations);
    setEditingDestination(null);
    setFormData({
      name: "",
      country: "",
      description: "",
      rating: "",
      isTrending: false,
    });
    setShowForm(false);
  };

  const toggleTrendingStatus = (id: string) => {
    setDestinations(
      destinations.map((dest) =>
        dest.id === id ? { ...dest, isTrending: !dest.isTrending } : dest
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trending Destinations</h1>
          <p className="text-gray-600">Manage trending destinations and their details.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Destinations</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <div key={destination.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{destination.image}</div>
                  <button
                    onClick={() => toggleTrendingStatus(destination.id)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      destination.isTrending
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {destination.isTrending ? "Trending" : "Not Trending"}
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.country}</p>
                <p className="text-sm text-gray-700 mt-2">{destination.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-700 ml-1">{destination.rating}</span>
                  </div>
                  <button
                    onClick={() => handleEditDestination(destination)}
                    className="hover:cursor-pointer hover:scale-105 text-blue-600 hover:text-blue-900 text-sm transition-transform"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && editingDestination && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Edit Destination - {editingDestination.name}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Mark as Trending</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleUpdateDestination}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Destination
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingDestination(null);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTrendingDestinations; 