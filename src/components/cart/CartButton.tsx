
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartContext } from './CartProvider';

const CartButton = () => {
  const { toggleCart, getCartTotal } = useCartContext();
  
  return (
    <Button variant="outline" size="icon" className="relative" onClick={toggleCart}>
      <ShoppingCart className="h-4 w-4" />
      {getCartTotal() > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {getCartTotal()}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
