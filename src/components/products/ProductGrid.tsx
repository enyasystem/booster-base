import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, CircleDollarSign, ShoppingCart } from "lucide-react";
import { useCartContext } from "@/components/cart/CartProvider";
import { toast } from "@/components/ui/use-toast";
import { useState } from 'react';
import ProductDetailsModal from './ProductDetailsModal';
import { formatPrice } from '@/utils/formatters';

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

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCartContext();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price_range: product.price_range,
      image_url: product.image_url,
    }, false); // Pass false to not show cart automatically
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-64 rounded-lg mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative aspect-video">
              <img
                src={product.image_url}
                alt={product.name}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">{product.description}</p>
              <div className="mt-auto space-y-4">
                <span className="text-primary font-medium block">
                  {formatPrice(product.price_range)}
                </span>
                <div className="flex gap-2">
                  {/* <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button> */}
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductGrid;
