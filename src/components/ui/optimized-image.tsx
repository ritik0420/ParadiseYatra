"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  width,
  height,
  fill = false,
  priority = false
}: OptimizedImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // List of domains that might have CORS issues
  const corsProneDomains = [
    'a.travel-assets.com',
    'cdn-imgix.headout.com',
    'travel-assets.com',
    'imgix.headout.com'
  ];

  // Check if the URL is from a CORS-prone domain
  const isCorsProne = (url: string) => {
    try {
      const urlObj = new URL(url);
      return corsProneDomains.some(domain => urlObj.hostname.includes(domain));
    } catch {
      return false;
    }
  };

  // Convert external URL to proxy URL if needed
  const getProxiedUrl = (url: string) => {
    if (isCorsProne(url)) {
      return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  useEffect(() => {
    console.log('OptimizedImage - src changed:', src);
    const processedSrc = getProxiedUrl(src);
    setCurrentSrc(processedSrc);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    console.log('OptimizedImage - Image failed to load:', currentSrc);
    if (!hasError && currentSrc !== fallbackSrc) {
      console.log('OptimizedImage - Falling back to:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      console.log('OptimizedImage - Fallback also failed, showing loading state');
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    console.log('OptimizedImage - Image loaded successfully:', currentSrc);
    setIsLoading(false);
    setHasError(false);
  };

  // If the image is from an external domain, use a regular img tag
  if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded flex items-center justify-center">
            <span className="text-gray-500 text-sm">Loading...</span>
          </div>
        )}
        <img
          src={currentSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          crossOrigin="anonymous"
          loading="lazy"
        />
      </div>
    );
  }

  // For local images, use Next.js Image component
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      )}
      <Image
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default OptimizedImage; 