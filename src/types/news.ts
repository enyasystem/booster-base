
export interface NewsPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  excerpt?: string;
  status: 'draft' | 'published';
  published_at: string;
  updated_at: string;
  slug: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  status: 'draft' | 'published';
  slug: string;
}
