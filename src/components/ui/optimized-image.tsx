"use client";

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

interface OptimizedImageProps {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  onError,
}: OptimizedImageProps) {
  return (
    <Image
      src={getImageUrl(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={onError}
    />
  );
} 