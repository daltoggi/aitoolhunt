import type { Category } from './category';

export type PricingType = 'free' | 'freemium' | 'paid' | 'contact';

export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: number;
  websiteUrl: string;
  affiliateUrl: string | null;
  logoUrl: string | null;
  pricingType: PricingType;
  features: string[];
  useCases: string[];
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ToolWithCategory extends Tool {
  category: Category;
}

export interface ToolListItem {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  logoUrl: string | null;
  pricingType: PricingType;
  isFeatured: boolean;
  tags: string[];
}

export interface CreateToolInput {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: number;
  websiteUrl: string;
  affiliateUrl?: string;
  logoUrl?: string;
  pricingType: PricingType;
  features?: string[];
  useCases?: string[];
  tags?: string[];
  isFeatured?: boolean;
}

export interface UpdateToolInput extends Partial<CreateToolInput> {}
