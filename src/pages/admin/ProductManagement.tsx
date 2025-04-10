import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { FetchError } from '@/components/admin/FetchError';
import ProductForm from '@/components/admin/products/ProductForm';
import ProductsTable from '@/components/admin/products/ProductsTable';
import { useAuth } from '@/hooks/useAuth';
import { AccessDenied } from '@/components/admin/AccessDenied';
import { PostgrestError } from '@supabase/supabase-js';
import { Category } from '@/types/products';

type DatabaseError = PostgrestError | Error;

const ProductManagement = () => {
  const { checkIsAdmin } = useAuth();
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const verifyAdmin = async () => {
      const isAdminUser = await checkIsAdmin();
      setIsAdmin(isAdminUser);
      setAdminChecked(true);
    };
    
    verifyAdmin();
  }, [checkIsAdmin]);

  const fetchProducts = async () => {
    try {
      const { data: cats } = await supabase.from('categories').select('*');
      console.log('Categories available:', cats);

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:category_id(id, name, slug)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      console.log('Products fetched:', data);
      return data || []; // Ensure we always return an array
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      console.error('Error fetching products:', dbError);
      toast({
        title: "Error",
        description: `Failed to fetch products: ${dbError.message}`,
        variant: "destructive",
      });
      return []; // Return empty array on error
    }
  };

  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-products'],
    queryFn: fetchProducts,
    enabled: isAdmin,
    initialData: [] // Provide initial data
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      // Log available categories and their IDs
      console.log('Available categories:', data?.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug
      })));
      return data;
    },
    enabled: isAdmin
  });

  // If the admin status is still being checked, show a loading indicator
  if (!adminChecked) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If the user is not logged in or not an admin
  if (!isAdmin) {
    return <AccessDenied />;
  }

  if (error) {
    return <FetchError message={error.message} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ProductsTable 
          products={products || []} 
          onProductUpdated={() => {
            refetch();
            toast({
              title: "Success",
              description: "Product updated successfully",
            });
          }}
          onProductDeleted={() => {
            refetch();
            toast({
              title: "Success",
              description: "Product deleted successfully",
            });
          }}
          categories={categories || []}
        />
      )}

      <ProductForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          refetch();
          toast({
            title: "Success",
            description: "Product created successfully",
          });
        }}
        categories={categories || []}
      />
    </div>
  );
};

export default ProductManagement;
