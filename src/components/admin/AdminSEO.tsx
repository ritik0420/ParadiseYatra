"use client";

import { useState } from "react";
import ImageUpload from "@/components/ui/image-upload";

interface SEOSettings {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  lastUpdated: string;
}

const AdminSEO = () => {
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([
    {
      id: "1",
      page: "Homepage",
      title: "Paradise Yatra - Your Ultimate Travel Partner",
      description: "Discover amazing travel destinations and book your dream vacation with Paradise Yatra. Premium travel packages and adventure tours.",
      keywords: "travel, vacation, destinations, paradise yatra, adventure tours",
      ogImage: "/og-homepage.jpg",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      page: "Packages",
      title: "Travel Packages - Paradise Yatra",
      description: "Explore our curated collection of travel packages including premium, adventure, and cultural tours.",
      keywords: "travel packages, premium tours, adventure packages, cultural tours",
      ogImage: "/og-packages.jpg",
      lastUpdated: "2024-01-10",
    },
    {
      id: "3",
      page: "Blog",
      title: "Travel Blog - Paradise Yatra",
      description: "Read travel tips, destination guides, and travel stories from our expert travel writers.",
      keywords: "travel blog, travel tips, destination guides, travel stories",
      ogImage: "/og-blog.jpg",
      lastUpdated: "2024-01-05",
    },
  ]);

  const [editingSEO, setEditingSEO] = useState<SEOSettings | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    page: "",
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
  });

  const handleEditSEO = (seo: SEOSettings) => {
    setEditingSEO(seo);
    setFormData({
      page: seo.page,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      ogImage: seo.ogImage,
    });
    setShowForm(true);
  };

  const handleUpdateSEO = () => {
    if (!editingSEO) return;

    const updatedSEO = seoSettings.map((seo) =>
      seo.id === editingSEO.id
        ? {
            ...seo,
            page: formData.page,
            title: formData.title,
            description: formData.description,
            keywords: formData.keywords,
            ogImage: formData.ogImage,
            lastUpdated: new Date().toISOString().split('T')[0],
          }
        : seo
    );

    setSeoSettings(updatedSEO);
    setEditingSEO(null);
    setFormData({
      page: "",
      title: "",
      description: "",
      keywords: "",
      ogImage: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-gray-600">Manage SEO settings and meta tags for your website pages.</p>
        </div>
      </div>

      {/* SEO Settings List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Page SEO Settings</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {seoSettings.map((seo) => (
              <div key={seo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{seo.page}</h3>
                    <p className="text-sm text-gray-500">Last updated: {seo.lastUpdated}</p>
                  </div>
                  <button
                    onClick={() => handleEditSEO(seo)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer hover:scale-105 transition-all"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{seo.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{seo.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{seo.keywords}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OG Image</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{seo.ogImage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {showForm && editingSEO && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Edit SEO Settings - {editingSEO.page}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter page title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter keywords separated by commas"
              />
            </div>
            <div>
              <ImageUpload
                value={formData.ogImage}
                onChange={(value) => setFormData({ ...formData, ogImage: value })}
                label="OG Image"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleUpdateSEO}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update SEO Settings
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingSEO(null);
                setFormData({
                  page: "",
                  title: "",
                  description: "",
                  keywords: "",
                  ogImage: "",
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* SEO Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">SEO Best Practices</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Keep titles between 50-60 characters for optimal display</p>
          <p>• Meta descriptions should be 150-160 characters</p>
          <p>• Use relevant keywords naturally in your content</p>
          <p>• Ensure OG images are 1200x630 pixels for social sharing</p>
          <p>• Update content regularly to improve search rankings</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSEO; 