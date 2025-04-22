import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2, Star } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import ProductForm from './ProductForm';
import { PostgrestError } from '@supabase/supabase-js';
import { Product, Category } from '@/types/products';
import { useProductContext } from "@/context/ProductContext";

interface ProductsTableProps {
  products: Product[];
  onProductUpdated: () => void;
  onProductDeleted: () => void;
  categories: Category[];
}

type DatabaseError = PostgrestError | Error;

const ProductsTable = ({ 
  products, 
  onProductUpdated, 
  onProductDeleted,
  categories
}: ProductsTableProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { setProducts } = useProductContext();

  // Helper to refresh products from DB and update context
  const refreshProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data || []);
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deletingProduct.id);
      
      if (error) throw error;
      
      await refreshProducts(); // <-- update context after delete
      onProductDeleted();
    } catch (error: unknown) {
      const dbError = error as DatabaseError;
      console.error('Error deleting product:', dbError);
      toast({
        title: "Error",
        description: `Failed to delete product: ${dbError.message}`,
        variant: "destructive",
      });
    } finally {
      setDeletingProduct(null);
    }
  };

  // When a product is edited or added, also refresh products
  const handleProductUpdated = async () => {
    await refreshProducts();
    onProductUpdated();
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No products found. Add your first product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {product.category?.name || categories.find(c => c.id === product.category_id)?.name || 'N/A'}
                    </TableCell>
                    <TableCell>{product.price_range || 'N/A'}</TableCell>
                    <TableCell>
                      {product.is_featured && <Star className="h-4 w-4 text-yellow-500" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setDeletingProduct(product)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit product form */}
      {editingProduct && (
        <ProductForm
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={handleProductUpdated} // <-- use new handler
          product={editingProduct}
          categories={categories}
        />
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{deletingProduct?.name}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductsTable;
