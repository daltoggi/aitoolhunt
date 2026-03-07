export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  toolCount: number;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description: string;
  iconName?: string;
}
