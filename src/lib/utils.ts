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

  // If it's already a relative URL or our own domain, return as is
  if (imageUrl.startsWith('/') || imageUrl.startsWith('http://localhost') || imageUrl.startsWith('http://127.0.0.1')) {
    return imageUrl;
  }

  // For external URLs, proxy through our API
  return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
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