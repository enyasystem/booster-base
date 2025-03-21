
import { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import ProductGrid from '@/components/products/ProductGrid';
import ProductCategories from '@/components/products/ProductCategories';
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

// Update interface to match Supabase schema
interface Product {
  id: string;
  name: string;
  description: string;
  price_range: string;
  image_url: string;
  features: string[];
  category_id: string;
  is_featured: boolean;
}

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('service_categories')
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;

        // Fetch from products table instead of services_offered
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('name');

        if (productsError) throw productsError;

        setCategories(categoriesData || []);
        
        // Transform the data to match Product interface
        const transformedProducts = (productsData as Product[] || []).map(product => ({
          id: product.id,
          name: product.name,
          description: product.description || '',
          price_range: product.price_range || 'Contact for pricing',
          image_url: product.image_url || '',
          features: product.features || [],
          category_id: product.category_id || '',
          is_featured: product.is_featured || false
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        toast({
          title: "Error loading products",
          description: "Please try again later",
          variant: "destructive",
        });
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality IT products and solutions
          </p>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ProductCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            isLoading={isLoading}
          />
          <ProductGrid 
            products={filteredProducts}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
};

export default Products;
