"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterContent {
  companyInfo: {
    name: string;
    description: string;
    logo: string;
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
  links: {
    international: Array<{ name: string; href: string }>;
    india: Array<{ name: string; href: string }>;
    trekking: Array<{ name: string; href: string }>;
    quickLinks: Array<{ name: string; href: string }>;
  };
  socialMedia: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  copyright: string;
}

const AdminFooter = () => {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    companyInfo: {
      name: "Paradise Yatra",
      description: "Your trusted partner for unforgettable travel experiences. We specialize in creating personalized journeys that combine adventure, culture, and luxury.",
      logo: "/logo.png"
    },
    contactInfo: {
      address: "48, General Mahadev Singh Rd, Dehradun, Uttarakhand 248001",
      phone: "+91 8979396413",
      email: "info@paradiseyatra.com"
    },
    links: {
      international: [
        { name: "Singapore", href: "#" },
        { name: "Thailand", href: "#" },
        { name: "Malaysia", href: "#" },
        { name: "Vietnam", href: "#" },
        { name: "Europe", href: "#" },
        { name: "Dubai", href: "#" },
        { name: "Maldives", href: "#" }
      ],
      india: [
        { name: "Rajasthan", href: "#" },
        { name: "Kerala", href: "#" },
        { name: "Himachal", href: "#" },
        { name: "Uttarakhand", href: "#" },
        { name: "Goa", href: "#" },
        { name: "Kashmir", href: "#" }
      ],
      trekking: [
        { name: "Kedarnath", href: "#" },
        { name: "Badrinath", href: "#" },
        { name: "Valley of Flowers", href: "#" },
        { name: "Roopkund", href: "#" },
        { name: "Har Ki Dun", href: "#" }
      ],
      quickLinks: [
        { name: "Home", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" }
      ]
    },
    socialMedia: [
      { platform: "Facebook", url: "#", icon: "Facebook" },
      { platform: "Twitter", url: "#", icon: "Twitter" },
      { platform: "Instagram", url: "#", icon: "Instagram" },
      { platform: "YouTube", url: "#", icon: "Youtube" },
      { platform: "LinkedIn", url: "#", icon: "Linkedin" }
    ],
    copyright: `© ${new Date().getFullYear()} Paradise Yatra. All rights reserved.`
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState<FooterContent>(footerContent);

  const handleSave = () => {
    setFooterContent(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(footerContent);
    setIsEditing(false);
  };

  const updateLink = (category: keyof FooterContent['links'], index: number, field: string, value: string) => {
    const newLinks = { ...tempContent.links };
    newLinks[category][index] = { ...newLinks[category][index], [field]: value };
    setTempContent({ ...tempContent, links: newLinks });
  };

  const addLink = (category: keyof FooterContent['links']) => {
    const newLinks = { ...tempContent.links };
    newLinks[category].push({ name: "", href: "" });
    setTempContent({ ...tempContent, links: newLinks });
  };

  const removeLink = (category: keyof FooterContent['links'], index: number) => {
    const newLinks = { ...tempContent.links };
    newLinks[category] = newLinks[category].filter((_, i) => i !== index);
    setTempContent({ ...tempContent, links: newLinks });
  };

  const updateSocialMedia = (index: number, field: string, value: string) => {
    const newSocialMedia = [...tempContent.socialMedia];
    newSocialMedia[index] = { ...newSocialMedia[index], [field]: value };
    setTempContent({ ...tempContent, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setTempContent({
      ...tempContent,
      socialMedia: [...tempContent.socialMedia, { platform: "", url: "", icon: "" }]
    });
  };

  const removeSocialMedia = (index: number) => {
    setTempContent({
      ...tempContent,
      socialMedia: tempContent.socialMedia.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Footer Management</h1>
          <p className="text-gray-600">Manage your website footer content including company info, links, and social media.</p>
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
              <Button onClick={handleCancel} variant="admin-outline">
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Current Content Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Footer Content</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Company Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {footerContent.companyInfo.name}</p>
                <p><strong>Description:</strong> {footerContent.companyInfo.description}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Address:</strong> {footerContent.contactInfo.address}</p>
                <p><strong>Phone:</strong> {footerContent.contactInfo.phone}</p>
                <p><strong>Email:</strong> {footerContent.contactInfo.email}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Footer Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">International Tours</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  {footerContent.links.international.map((link, index) => (
                    <div key={index}>• {link.name}</div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">India Tours</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  {footerContent.links.india.map((link, index) => (
                    <div key={index}>• {link.name}</div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Trekking</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  {footerContent.links.trekking.map((link, index) => (
                    <div key={index}>• {link.name}</div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Quick Links</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  {footerContent.links.quickLinks.map((link, index) => (
                    <div key={index}>• {link.name}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
            <div className="flex flex-wrap gap-2">
              {footerContent.socialMedia.map((social, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {social.platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Footer Content</h2>
          <div className="space-y-6">
            {/* Company Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={tempContent.companyInfo.name}
                    onChange={(e) => setTempContent({
                      ...tempContent,
                      companyInfo: { ...tempContent.companyInfo, name: e.target.value }
                    })}
                    placeholder="Paradise Yatra"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={tempContent.companyInfo.description}
                    onChange={(e) => setTempContent({
                      ...tempContent,
                      companyInfo: { ...tempContent.companyInfo, description: e.target.value }
                    })}
                    rows={3}
                    className="w-full text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                  <Input
                    value={tempContent.companyInfo.logo}
                    onChange={(e) => setTempContent({
                      ...tempContent,
                      companyInfo: { ...tempContent.companyInfo, logo: e.target.value }
                    })}
                    placeholder="/logo.png"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <Input
                    value={tempContent.contactInfo.address}
                    onChange={(e) => setTempContent({
                      ...tempContent,
                      contactInfo: { ...tempContent.contactInfo, address: e.target.value }
                    })}
                    placeholder="Company address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
            </div>

            {/* Footer Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer Links</h3>
              <div className="space-y-6">
                {(['international', 'india', 'trekking', 'quickLinks'] as const).map((category) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()} Links</h4>
                      <Button onClick={() => addLink(category)} size="sm" className="bg-green-600 hover:bg-green-700">
                        Add Link
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {tempContent.links[category].map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={link.name}
                            onChange={(e) => updateLink(category, index, 'name', e.target.value)}
                            placeholder="Link name"
                            className="flex-1"
                          />
                          <Input
                            value={link.href}
                            onChange={(e) => updateLink(category, index, 'href', e.target.value)}
                            placeholder="#"
                            className="w-24"
                          />
                          <Button 
                            onClick={() => removeLink(category, index)} 
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
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
                <Button onClick={addSocialMedia} size="sm" className="bg-green-600 hover:bg-green-700">
                  Add Social Media
                </Button>
              </div>
              <div className="space-y-4">
                {tempContent.socialMedia.map((social, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900">Social Media {index + 1}</h4>
                      <Button 
                        onClick={() => removeSocialMedia(index)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Platform</label>
                        <Input
                          value={social.platform}
                          onChange={(e) => updateSocialMedia(index, 'platform', e.target.value)}
                          placeholder="Facebook"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">URL</label>
                        <Input
                          value={social.url}
                          onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Icon Name</label>
                        <Input
                          value={social.icon}
                          onChange={(e) => updateSocialMedia(index, 'icon', e.target.value)}
                          placeholder="Facebook"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
              <Input
                value={tempContent.copyright}
                onChange={(e) => setTempContent({ ...tempContent, copyright: e.target.value })}
                placeholder="© 2024 Paradise Yatra. All rights reserved."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFooter; 