"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderContent {
  contactInfo: {
    phone: string;
    email: string;
  };
  trustIndicators: Array<{
    icon: string;
    text: string;
    color: string;
  }>;
  navigation: Array<{
    name: string;
    submenu: Array<{
      name: string;
      href: string;
    }>;
  }>;
  logo: string;
}

const AdminHeader = () => {
  const [headerContent, setHeaderContent] = useState<HeaderContent>({
    contactInfo: {
      phone: "+91 8979396413",
      email: "info@paradiseyatra.com"
    },
    trustIndicators: [
      { icon: "Star", text: "4.9 Rating", color: "text-yellow-300" },
      { icon: "Shield", text: "100% Customized", color: "text-blue-200" },
      { icon: "Users", text: "5000+ Travelers", color: "text-green-200" },
      { icon: "Headphones", text: "24/7 Support", color: "text-pink-200" }
    ],
    navigation: [
      {
        name: "International Tours",
        submenu: [
          { name: "Europe Packages", href: "#" },
          { name: "Southeast Asia", href: "#" },
          { name: "Middle East", href: "#" }
        ]
      },
      {
        name: "India Tours",
        submenu: [
          { name: "Himalayan Getaways", href: "#" },
          { name: "Beach Vacations", href: "#" },
          { name: "Cultural Tours", href: "#" }
        ]
      },
      {
        name: "Trekking",
        submenu: [
          { name: "Beginner Treks", href: "#" },
          { name: "Advanced Expeditions", href: "#" },
          { name: "Pilgrimage Treks", href: "#" }
        ]
      }
    ],
    logo: "/logo.png"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<HeaderContent>(headerContent);

  const handleSave = () => {
    setHeaderContent(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(headerContent);
    setIsEditing(false);
  };

  const updateTrustIndicator = (index: number, field: keyof HeaderContent['trustIndicators'][0], value: string) => {
    const newTrustIndicators = [...tempContent.trustIndicators];
    newTrustIndicators[index] = { ...newTrustIndicators[index], [field]: value };
    setTempContent({ ...tempContent, trustIndicators: newTrustIndicators });
  };

  const addTrustIndicator = () => {
    setTempContent({
      ...tempContent,
      trustIndicators: [...tempContent.trustIndicators, { icon: "", text: "", color: "" }]
    });
  };

  const removeTrustIndicator = (index: number) => {
    setTempContent({
      ...tempContent,
      trustIndicators: tempContent.trustIndicators.filter((_, i) => i !== index)
    });
  };

  const updateNavigation = (navIndex: number, field: string, value: string) => {
    const newNavigation = [...tempContent.navigation];
    newNavigation[navIndex] = { ...newNavigation[navIndex], [field]: value };
    setTempContent({ ...tempContent, navigation: newNavigation });
  };

  const updateSubmenu = (navIndex: number, subIndex: number, field: string, value: string) => {
    const newNavigation = [...tempContent.navigation];
    newNavigation[navIndex].submenu[subIndex] = { 
      ...newNavigation[navIndex].submenu[subIndex], 
      [field]: value 
    };
    setTempContent({ ...tempContent, navigation: newNavigation });
  };

  const addNavigation = () => {
    setTempContent({
      ...tempContent,
      navigation: [...tempContent.navigation, { name: "", submenu: [] }]
    });
  };

  const removeNavigation = (index: number) => {
    setTempContent({
      ...tempContent,
      navigation: tempContent.navigation.filter((_, i) => i !== index)
    });
  };

  const addSubmenu = (navIndex: number) => {
    const newNavigation = [...tempContent.navigation];
    newNavigation[navIndex].submenu.push({ name: "", href: "" });
    setTempContent({ ...tempContent, navigation: newNavigation });
  };

  const removeSubmenu = (navIndex: number, subIndex: number) => {
    const newNavigation = [...tempContent.navigation];
    newNavigation[navIndex].submenu = newNavigation[navIndex].submenu.filter((_, i) => i !== subIndex);
    setTempContent({ ...tempContent, navigation: newNavigation });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Header Management</h1>
          <p className="text-gray-600">Manage your website header content including contact info, trust indicators, and navigation.</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
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
          <h2 className="text-xl font-semibold text-gray-900">Current Header Content</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Phone:</strong> {headerContent.contactInfo.phone}</p>
                <p><strong>Email:</strong> {headerContent.contactInfo.email}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Trust Indicators</h4>
              <div className="flex flex-wrap gap-2">
                {headerContent.trustIndicators.map((indicator, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {indicator.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Navigation Menu</h4>
            <div className="space-y-2">
              {headerContent.navigation.map((nav, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-gray-900">{nav.name}</div>
                  <div className="text-sm text-gray-600 ml-4">
                    {nav.submenu.map((sub, subIndex) => (
                      <div key={subIndex}>• {sub.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Header Content</h2>
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    value={tempContent.contactInfo.phone}
                    onChange={(e) => setTempContent({
                      ...tempContent,
                      contactInfo: { ...tempContent.contactInfo, phone: e.target.value }
                    })}
                    placeholder="+91 8979396413"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    value={tempContent.contactInfo.email}
                    onChange={(e) => setTempContent({
                      ...tempContent,
                      contactInfo: { ...tempContent.contactInfo, email: e.target.value }
                    })}
                    placeholder="info@paradiseyatra.com"
                  />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Trust Indicators</h3>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Icon Name</label>
                        <Input
                          value={indicator.icon}
                          onChange={(e) => updateTrustIndicator(index, 'icon', e.target.value)}
                          placeholder="Star"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Text</label>
                        <Input
                          value={indicator.text}
                          onChange={(e) => updateTrustIndicator(index, 'text', e.target.value)}
                          placeholder="4.9 Rating"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Color Class</label>
                        <Input
                          value={indicator.color}
                          onChange={(e) => updateTrustIndicator(index, 'color', e.target.value)}
                          placeholder="text-yellow-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Navigation Menu</h3>
                <Button onClick={addNavigation} size="sm" className="bg-green-600 hover:bg-green-700">
                  Add Navigation
                </Button>
              </div>
              <div className="space-y-4">
                {tempContent.navigation.map((nav, navIndex) => (
                  <div key={navIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Navigation {navIndex + 1}</h4>
                      <Button 
                        onClick={() => removeNavigation(navIndex)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
                        <Input
                          value={nav.name}
                          onChange={(e) => updateNavigation(navIndex, 'name', e.target.value)}
                          placeholder="International Tours"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">Submenu Items</label>
                          <Button 
                            onClick={() => addSubmenu(navIndex)} 
                            size="sm" 
                            variant="outline"
                          >
                            Add Submenu
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {nav.submenu.map((sub, subIndex) => (
                            <div key={subIndex} className="flex gap-2">
                              <Input
                                value={sub.name}
                                onChange={(e) => updateSubmenu(navIndex, subIndex, 'name', e.target.value)}
                                placeholder="Submenu name"
                                className="flex-1"
                              />
                              <Input
                                value={sub.href}
                                onChange={(e) => updateSubmenu(navIndex, subIndex, 'href', e.target.value)}
                                placeholder="#"
                                className="w-24"
                              />
                              <Button 
                                onClick={() => removeSubmenu(navIndex, subIndex)} 
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
                ))}
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
              <Input
                value={tempContent.logo}
                onChange={(e) => setTempContent({ ...tempContent, logo: e.target.value })}
                placeholder="/logo.png"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeader; 