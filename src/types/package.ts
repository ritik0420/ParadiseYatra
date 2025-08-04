export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  featured: boolean;
  image: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  terms: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals?: string[];
}

export interface PackageResponse {
  data: Package[];
  message?: string;
  success?: boolean;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface SinglePackageResponse {
  data: Package;
  message?: string;
  success?: boolean;
} 