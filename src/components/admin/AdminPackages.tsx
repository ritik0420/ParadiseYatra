"use client";

import { useState } from "react";

interface Package {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  category: string;
  status: "active" | "inactive";
  image: string;
}

const AdminPackages = () => {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "1",
      name: "Maldives Paradise",
      destination: "Maldives",
      duration: "7 Days",
      price: 2500,
      category: "Premium",
      status: "active",
      image: "🏝️",
    },
    {
      id: "2",
      name: "Swiss Alps Adventure",
      destination: "Switzerland",
      duration: "10 Days",
      price: 3200,
      category: "Adventure",
      status: "active",
      image: "🏔️",
    },
    {
      id: "3",
      name: "Tokyo City Tour",
      destination: "Japan",
      duration: "5 Days",
      price: 1800,
      category: "Cultural",
      status: "inactive",
      image: "🗼",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    category: "",
    status: "active",
  });

  const handleAddPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      name: formData.name,
      destination: formData.destination,
      duration: formData.duration,
      price: parseFloat(formData.price),
      category: formData.category,
      status: formData.status as "active" | "inactive",
      image: "📦",
    };

    setPackages([...packages, newPackage]);
    setFormData({
      name: "",
      destination: "",
      duration: "",
      price: "",
      category: "",
      status: "active",
    });
    setShowAddForm(false);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price.toString(),
      category: pkg.category,
      status: pkg.status,
    });
    setShowAddForm(true);
  };

  const handleUpdatePackage = () => {
    if (!editingPackage) return;

    const updatedPackages = packages.map((pkg) =>
      pkg.id === editingPackage.id
        ? {
            ...pkg,
            name: formData.name,
            destination: formData.destination,
            duration: formData.duration,
            price: parseFloat(formData.price),
            category: formData.category,
            status: formData.status as "active" | "inactive",
          }
        : pkg
    );

    setPackages(updatedPackages);
    setEditingPackage(null);
    setFormData({
      name: "",
      destination: "",
      duration: "",
      price: "",
      category: "",
      status: "active",
    });
    setShowAddForm(false);
  };

  const handleDeletePackage = (id: string) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const togglePackageStatus = (id: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === id
          ? { ...pkg, status: pkg.status === "active" ? "inactive" : "active" }
          : pkg
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600">Manage your travel packages and offerings.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Package
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingPackage ? "Edit Package" : "Add New Package"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter package name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter destination"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 7 Days"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="Premium">Premium</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Beach">Beach</option>
                <option value="Mountain">Mountain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={editingPackage ? handleUpdatePackage : handleAddPackage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingPackage ? "Update Package" : "Add Package"}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingPackage(null);
                setFormData({
                  name: "",
                  destination: "",
                  duration: "",
                  price: "",
                  category: "",
                  status: "active",
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Packages List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Packages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
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
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{pkg.image}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pkg.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pkg.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${pkg.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {pkg.category}
                    </span>
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
                        onClick={() => handleEditPackage(pkg)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPackages; 