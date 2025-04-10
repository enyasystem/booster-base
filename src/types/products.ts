export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price_range: string;
  category_id: string;
  image_url?: string;
  is_featured: boolean;
  features: string[];
  category?: Category;  // Changed from categories to category
}
