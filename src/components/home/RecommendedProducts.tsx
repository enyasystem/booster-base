import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useCartContext } from '@/components/cart/CartProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ProductModal from '../products/ProductModal';
import { useProductContext } from "@/context/ProductContext";

// Define the Product type
interface Product {
  id: string;
  name: string;
  description: string;
  price_range: string;
  image_url: string;
  category_id: string;
  is_featured: boolean;
}

const RecommendedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { addToCart } = useCartContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { setProducts: setGlobalProducts } = useProductContext();
  
  // Initialize carousel with autoplay plugin
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1 
  }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .order('name')
          .limit(6);

        if (error) throw error;
        setProducts(data || []);
        setGlobalProducts(data || []);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast, setGlobalProducts]);

  const handleAddToCart = (product: Product) => {
    // Set showCart to false to prevent auto-popup
    addToCart({
      id: product.id,
      name: product.name,
      price_range: product.price_range,
      image_url: product.image_url,
    }, false);
    
    toast({
      title: "Added to Cart",
      description: `<a 
                  href="tel:+2348038913567" 
                  className="flex items-center gap-1 text-lg font-bold text-blue-600 hover:text-blue-800"
                >
                  📞 Call now
                </a> has been added to your cart.`,
    });
  };

  const formatCurrency = (price: string) => {
    // Format price as Naira
    return `<a 
                  href="tel:+2348038913567" 
                  className="flex items-center gap-1 text-lg font-bold text-blue-600 hover:text-blue-800"
                >
                  📞 Call now
                </a>`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {[1, 2, 3].map(i => (
          <Card key={i} className="bg-white text-foreground">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-primary-foreground/80">No featured products available.</p>
      </div>
    );
  }

  return (
    <div className="w-full my-12 max-w-7xl mx-auto px-4">
      <Carousel 
        ref={emblaRef}
        className="relative"
        opts={{
          align: "start",
          loop: true
        }}
      >
        <CarouselContent className="-ml-0 md:-ml-0">
          {products.map(product => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-0 md:pl-4">
              <Card className="h-full bg-white text-foreground flex flex-col border shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">
                  <a 
  href="tel:+2348038913567" 
  className="flex items-center gap-1 text-lg font-bold text-blue-600 hover:text-blue-800"
>
  📞 Call now
</a>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Learn More
                  </Button>
                  {/* <Button  */}
                    {/* // className="bg-blue-600 hover:bg-blue-700"
                    // onClick={() => handleAddToCart(product)}
                  > */}
                    {/* <ShoppingCart className="h-4 w-4" /> */}
                  {/* </Button> */}
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default RecommendedProducts;
