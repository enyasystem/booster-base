import { useEffect, useState } from 'react';
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

const recommendedProducts: Product[] = [
  {
    id: "1",
    name: "Enterprise Network Solution",
    description: "Complete Cisco networking infrastructure with switches, routers, and security appliances.",
    price_range: "2,500,000",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category_id: "networking",
    is_featured: true
  },
  {
    id: "2",
    name: "Cloud Infrastructure Package",
    description: "AWS/Azure cloud infrastructure setup with monitoring and management tools.",
    price_range: "1,800,000",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category_id: "cloud",
    is_featured: true
  },
  {
    id: "3",
    name: "Cybersecurity Suite",
    description: "Enterprise-grade security solution with firewall, antivirus, and threat detection.",
    price_range: "3,200,000",
    image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category_id: "security",
    is_featured: true
  },
  {
    id: "4",
    name: "Data Center Solutions",
    description: "Complete data center setup with servers, storage, and backup systems.",
    price_range: "5,500,000",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category_id: "infrastructure",
    is_featured: true
  },
  {
    id: "5",
    name: "Business Communication Suite",
    description: "VoIP phone systems, video conferencing, and unified communications.",
    price_range: "1,200,000",
    image_url: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category_id: "communication",
    is_featured: true
  },
  {
    id: "6",
    name: "Digital Transformation Package",
    description: "Complete business digitalization solution with software and infrastructure.",
    price_range: "4,800,000",
    image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category_id: "digital",
    is_featured: true
  }
];

const RecommendedProducts = () => {
  const [products, setProducts] = useState<Product[]>(recommendedProducts);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCartContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Initialize carousel with autoplay plugin
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1 
  }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

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
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatCurrency = (price: string) => {
    // Format price as Naira
    return `₦${price}`;
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
                    ₦{product.price_range}
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
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
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
