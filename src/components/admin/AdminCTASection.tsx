"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CTAContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string; 
  backgroundImage: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  trustIndicators: Array<{
    icon: string;
    text: string;
  }>;
}

const AdminCTASection = () => {
  const [ctaContent, setCtaContent] = useState<CTAContent>({
    title: "Ready for Your Next",
    subtitle: "Adventure?",
    description: "Join thousands of travelers who trust Paradise Yatra for their dream vacations. Start planning your perfect journey today and create memories that last a lifetime.",
    primaryCTA: "Start Planning",
    secondaryCTA: "View Packages",
    backgroundImage: "/banner.jpeg",
    features: [
      { icon: "Globe", title: "Global Destinations", description: "Explore 50+ countries worldwide" },
      { icon: "MapPin", title: "Customized Tours", description: "Personalized experiences for you" },
      { icon: "Calendar", title: "Flexible Booking", description: "Book now, travel when you want" },
      { icon: "Shield", title: "Safe Travel", description: "Your safety is our priority" }
    ],
    trustIndicators: [
      { icon: "Users", text: "500+ Happy Travelers" },
      { icon: "Star", text: "4.9/5 Rating" },
      { icon: "Clock", text: "24/7 Support" },
      { icon: "Shield", text: "Safe & Secure" }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<CTAContent>(ctaContent);

  const handleSave = () => {
    setCtaContent(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(ctaContent);
    setIsEditing(false);
  };

  const updateFeature = (index: number, field: keyof CTAContent['features'][0], value: string) => {
    const newFeatures = [...tempContent.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setTempContent({ ...tempContent, features: newFeatures });
  };

  const updateTrustIndicator = (index: number, field: keyof CTAContent['trustIndicators'][0], value: string) => {
    const newTrustIndicators = [...tempContent.trustIndicators];
    newTrustIndicators[index] = { ...newTrustIndicators[index], [field]: value };
    setTempContent({ ...tempContent, trustIndicators: newTrustIndicators });
  };

  const addFeature = () => {
    setTempContent({
      ...tempContent,
      features: [...tempContent.features, { icon: "", title: "", description: "" }]
    });
  };

  const removeFeature = (index: number) => {
    setTempContent({
      ...tempContent,
      features: tempContent.features.filter((_, i) => i !== index)
    });
  };

  const addTrustIndicator = () => {
    setTempContent({
      ...tempContent,
      trustIndicators: [...tempContent.trustIndicators, { icon: "", text: "" }]
    });
  };

  const removeTrustIndicator = (index: number) => {
    setTempContent({
      ...tempContent,
      trustIndicators: tempContent.trustIndicators.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CTA Section Management</h1>
          <p className="text-gray-600">Manage your call-to-action section content and messaging.</p>
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
          <h2 className="text-xl font-semibold text-gray-900">Current CTA Section</h2>
        </div>
        <div className="p-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src={ctaContent.backgroundImage} 
              alt="CTA background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  {ctaContent.title} <span className="text-blue-200">{ctaContent.subtitle}</span>
                </h3>
                <p className="text-lg mb-4 max-w-2xl">{ctaContent.description}</p>
                <div className="flex gap-4 justify-center">
                  <span className="px-6 py-2 bg-white text-blue-600 rounded-full font-semibold">
                    {ctaContent.primaryCTA}
                  </span>
                  <span className="px-6 py-2 border border-white rounded-full">
                    {ctaContent.secondaryCTA}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Content Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Title:</strong> {ctaContent.title}</p>
                <p><strong>Subtitle:</strong> {ctaContent.subtitle}</p>
                <p><strong>Description:</strong> {ctaContent.description}</p>
                <p><strong>Primary CTA:</strong> {ctaContent.primaryCTA}</p>
                <p><strong>Secondary CTA:</strong> {ctaContent.secondaryCTA}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
              <div className="space-y-2">
                {ctaContent.features.map((feature, index) => (
                  <div key={index} className="text-sm">
                    <strong>{feature.title}:</strong> {feature.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit CTA Section</h2>
          <div className="space-y-6">
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
                <Input
                  value={tempContent.title}
                  onChange={(e) => setTempContent({ ...tempContent, title: e.target.value })}
                  placeholder="Ready for Your Next"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={tempContent.subtitle}
                  onChange={(e) => setTempContent({ ...tempContent, subtitle: e.target.value })}
                  placeholder="Adventure?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={tempContent.description}
                onChange={(e) => setTempContent({ ...tempContent, description: e.target.value })}
                rows={3}
                className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
                <Input
                  value={tempContent.primaryCTA}
                  onChange={(e) => setTempContent({ ...tempContent, primaryCTA: e.target.value })}
                  placeholder="Start Planning"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
                <Input
                  value={tempContent.secondaryCTA}
                  onChange={(e) => setTempContent({ ...tempContent, secondaryCTA: e.target.value })}
                  placeholder="View Packages"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
              <Input
                value={tempContent.backgroundImage}
                onChange={(e) => setTempContent({ ...tempContent, backgroundImage: e.target.value })}
                placeholder="/banner.jpeg"
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <Button onClick={addFeature} size="sm" className="bg-green-600 hover:bg-green-700">
                  Add Feature
                </Button>
              </div>
              <div className="space-y-4">
                {tempContent.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
                      <Button 
                        onClick={() => removeFeature(index)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Icon Name</label>
                        <Input
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          placeholder="Globe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          placeholder="Global Destinations"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                        <Input
                          value={feature.description}
                          onChange={(e) => updateFeature(index, 'description', e.target.value)}
                          placeholder="Explore 50+ countries worldwide"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Trust Indicators</label>
                <Button onClick={addTrustIndicator} size="sm" className="bg-green-600 hover:bg-green-700">
                  Add Indicator
                </Button>
              </div>
              <div className="space-y-4">
                {tempContent.trustIndicators.map((indicator, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Trust Indicator {index + 1}</h4>
                      <Button 
                        onClick={() => removeTrustIndicator(index)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Icon Name</label>
                        <Input
                          value={indicator.icon}
                          onChange={(e) => updateTrustIndicator(index, 'icon', e.target.value)}
                          placeholder="Users"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
                        <Input
                          value={indicator.text}
                          onChange={(e) => updateTrustIndicator(index, 'text', e.target.value)}
                          placeholder="500+ Happy Travelers"
                        />
                      </div>
                    </div>
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

export default AdminCTASection; 