
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, CircleDollarSign, ShoppingCart } from "lucide-react";
import { useCartContext } from "@/components/cart/CartProvider";
import { toast } from "@/components/ui/use-toast";

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

  // Format price to Naira
  const formatPrice = (priceRange: string) => {
    // If it contains numeric values, format them as Naira
    return priceRange.replace(/\$(\d+)/g, '₦$1').replace(/\$/g, '₦');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            {product.price_range && (
              <CardDescription className="flex items-center gap-1">
                <CircleDollarSign className="h-4 w-4" />
                {formatPrice(product.price_range)}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{product.description}</p>
            {product.features && product.features.length > 0 && (
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-4 pt-4">
              <Button 
                className="flex-1"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
