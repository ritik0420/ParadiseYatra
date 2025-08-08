import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to handle external image URLs
export function getImageUrl(imageUrl: string | null): string {
  if (!imageUrl) {
    return '/images/placeholder-travel.jpg'; // Fallback image
  }

  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // Check for problematic URLs that might cause issues
    if (imageUrl.includes('imgur.com') && imageUrl.includes('W7zDX9h.jpeg')) {
      console.warn('Detected problematic Imgur URL, using fallback:', imageUrl);
      return '/images/placeholder-travel.jpg';
    }
    // For external URLs, proxy through our API
    return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
  }

  // If it's a relative URL starting with /uploads, it's from our backend
  if (imageUrl.startsWith('/uploads/')) {
    // Use our dedicated API route for uploaded images
    return `/api/uploaded-images${imageUrl}`;
  }

  // If it's a relative URL (not uploads), return as is
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // For any other case, return fallback
  return '/images/placeholder-travel.jpg';
}

// Format price in Indian Rupees
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Get category color classes
export function getCategoryColor(category: string): string {
  const colors = {
    premium: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    adventure: 'bg-gradient-to-r from-green-400 to-emerald-500',
    holiday: 'bg-gradient-to-r from-blue-400 to-purple-500',
    trending: 'bg-gradient-to-r from-pink-400 to-rose-500'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-400';
} 