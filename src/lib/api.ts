import { Package } from '@/types/package';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(data.message || 'API request failed', response.status);
  }
  
  return data;
};

const makeRequest = async (url: string, options: RequestInit = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  return handleResponse(response);
};

export const packagesAPI = {
  async getAll(params: Record<string, any> = {}): Promise<ApiResponse<Package[]>> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    const url = `${API_BASE_URL}/api/packages${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return makeRequest(url);
  },

  async getById(id: string): Promise<ApiResponse<Package>> {
    const url = `${API_BASE_URL}/api/packages/${id}`;
    return makeRequest(url);
  },

  async getTrending(): Promise<ApiResponse<Package[]>> {
    const url = `${API_BASE_URL}/api/packages?featured=true&limit=6`;
    return makeRequest(url);
  },

  async getByCategory(category: string, params: Record<string, any> = {}): Promise<ApiResponse<Package[]>> {
    const searchParams = new URLSearchParams({ category, ...params });
    const url = `${API_BASE_URL}/api/packages?${searchParams.toString()}`;
    return makeRequest(url);
  },

  async search(query: string, params: Record<string, any> = {}): Promise<ApiResponse<Package[]>> {
    const searchParams = new URLSearchParams({ q: query, ...params });
    const url = `${API_BASE_URL}/api/packages/search?${searchParams.toString()}`;
    return makeRequest(url);
  },

  async create(packageData: Partial<Package>): Promise<ApiResponse<Package>> {
    const url = `${API_BASE_URL}/api/packages`;
    return makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(packageData),
    });
  },

  async update(id: string, packageData: Partial<Package>): Promise<ApiResponse<Package>> {
    const url = `${API_BASE_URL}/api/packages/${id}`;
    return makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify(packageData),
    });
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const url = `${API_BASE_URL}/api/packages/${id}`;
    return makeRequest(url, {
      method: 'DELETE',
    });
  },
}; 