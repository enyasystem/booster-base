
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
        setIsLoading(true);
        console.log("Fetching product categories and products...");
        
        // First fetch products from products table
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('name');

        if (productsError) {
          console.error("Error fetching products:", productsError);
          throw productsError;
        }
        
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
        
        // Then fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('service_categories')
          .select('*')
          .order('name');

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
          throw categoriesError;
        }
        
        setCategories(categoriesData || []);
        
      } catch (error: any) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading data",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter products based on the selected category
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
