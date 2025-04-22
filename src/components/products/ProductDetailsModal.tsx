export interface Product {
  id: string;
  name: string;
  description: string;
  price_range: string;
  image_url: string;
  features: string[];
  category_id: string;
  is_featured: boolean;
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from '@/utils/formatters';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart }: ProductDetailsModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <DialogDescription className="text-foreground">
            {product.description}
          </DialogDescription>
          {product.features && product.features.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-semibold text-primary">
            <a 
                  href="tel:+2348038913567" 
                  className="flex items-center gap-1 text-lg font-bold text-blue-600 hover:text-blue-800"
                >
                  📞 Call now
                </a>
            </span>
            {/* <Button onClick={() => onAddToCart(product)}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
