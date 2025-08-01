"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  trustBadge: string;
  backgroundImage: string;
  popularDestinations: string[];
}

const AdminHeroSection = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    headline: "Your Next Adventure Awaits",
    subheadline: "Unforgettable journeys, handpicked for you. Explore, dream, and discover with Paradise Yatra.",
    primaryCTA: "Plan My Trip",
    secondaryCTA: "See Popular Packages",
    trustBadge: "Trusted by 5000+ travelers",
    backgroundImage: "https://wallpapercave.com/wp/wp10918600.jpg",
    popularDestinations: ["Bali", "Thailand", "Europe", "Dubai", "Singapore"]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<HeroContent>(heroContent);

  const handleSave = () => {
    setHeroContent(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(heroContent);
    setIsEditing(false);
  };

  const addDestination = () => {
    setTempContent({
      ...tempContent,
      popularDestinations: [...tempContent.popularDestinations, ""]
    });
  };

  const removeDestination = (index: number) => {
    setTempContent({
      ...tempContent,
      popularDestinations: tempContent.popularDestinations.filter((_, i) => i !== index)
    });
  };

  const updateDestination = (index: number, value: string) => {
    const newDestinations = [...tempContent.popularDestinations];
    newDestinations[index] = value;
    setTempContent({
      ...tempContent,
      popularDestinations: newDestinations
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
          <p className="text-gray-600">Manage your homepage hero section content and messaging.</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer hover:scale-105 transition-all">
              Edit Content
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Current Content Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Hero Section</h2>
        </div>
        <div className="p-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src={heroContent.backgroundImage} 
              alt="Hero background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">{heroContent.headline}</h3>
                <p className="text-lg mb-4">{heroContent.subheadline}</p>
                <div className="flex gap-4 justify-center">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                    {heroContent.primaryCTA}
                  </span>
                  <span className="px-4 py-2 border border-white rounded-full text-sm">
                    {heroContent.secondaryCTA}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Content Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Headline:</strong> {heroContent.headline}</p>
                <p><strong>Subheadline:</strong> {heroContent.subheadline}</p>
                <p><strong>Primary CTA:</strong> {heroContent.primaryCTA}</p>
                <p><strong>Secondary CTA:</strong> {heroContent.secondaryCTA}</p>
                <p><strong>Trust Badge:</strong> {heroContent.trustBadge}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Popular Destinations</h4>
              <div className="flex flex-wrap gap-2">
                {heroContent.popularDestinations.map((dest, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Hero Section</h2>
          <div className="space-y-6">
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Headline</label>
                <Input
                  value={tempContent.headline}
                  onChange={(e) => setTempContent({ ...tempContent, headline: e.target.value })}
                  placeholder="Enter main headline"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trust Badge Text</label>
                <Input
                  value={tempContent.trustBadge}
                  onChange={(e) => setTempContent({ ...tempContent, trustBadge: e.target.value })}
                  placeholder="Trusted by 5000+ travelers"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
              <textarea
                value={tempContent.subheadline}
                onChange={(e) => setTempContent({ ...tempContent, subheadline: e.target.value })}
                rows={3}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subheadline text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                <Input
                  value={tempContent.primaryCTA}
                  onChange={(e) => setTempContent({ ...tempContent, primaryCTA: e.target.value })}
                  placeholder="Plan My Trip"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
                <Input
                  value={tempContent.secondaryCTA}
                  onChange={(e) => setTempContent({ ...tempContent, secondaryCTA: e.target.value })}
                  placeholder="See Popular Packages"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
              <Input
                value={tempContent.backgroundImage}
                onChange={(e) => setTempContent({ ...tempContent, backgroundImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Popular Destinations */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Popular Destinations</label>
                <Button onClick={addDestination} size="sm" className="bg-green-600 hover:bg-green-700">
                  Add Destination
                </Button>
              </div>
              <div className="space-y-2">
                {tempContent.popularDestinations.map((dest, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={dest}
                      onChange={(e) => updateDestination(index, e.target.value)}
                      placeholder="Enter destination name"
                    />
                    <Button 
                      onClick={() => removeDestination(index)} 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeroSection; 