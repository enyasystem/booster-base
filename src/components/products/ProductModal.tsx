import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartContext } from '@/components/cart/CartProvider';
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Check, Shield, Clock } from 'lucide-react';
import { motion } from "framer-motion";

interface ProductModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    price_range: string;
    image_url: string;
    category_id: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addToCart } = useCartContext();
  const { toast } = useToast();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price_range: product.price_range,
      image_url: product.image_url,
    }, true);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription className="text-lg text-blue-600 font-semibold">
            ₦{product.price_range}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Product Description */}
          <div className="prose max-w-none">
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg"
            >
              <Shield className="text-blue-600 h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">Enterprise Grade</h4>
                <p className="text-sm text-gray-600">Built for business needs</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg"
            >
              <Clock className="text-blue-600 h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-sm text-gray-600">Round-the-clock assistance</p>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.location.href = `mailto:sales@boosterbaseng.com?subject=Inquiry about ${product.name}`}
            >
              Request Quote
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
