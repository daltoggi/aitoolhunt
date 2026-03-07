export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ToolsQueryParams {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  search?: string;
  pricing?: string;
  sort?: 'newest' | 'name' | 'featured';
}

export interface SearchResult {
  tools: {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    categorySlug: string;
    pricingType: string;
  }[];
  total: number;
}
