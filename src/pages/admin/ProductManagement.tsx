
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

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, service_categories(*)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data;
      } catch (error: any) {
        console.error("Error fetching products:", error);
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
    },
    enabled: isAdmin
  });

  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
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
