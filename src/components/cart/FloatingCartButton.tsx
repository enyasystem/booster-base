
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const FloatingCartButton = () => {
  const { toggleCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={toggleCart}
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 relative"
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="h-6 w-6 text-white" />
        {cartTotal > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartTotal}
          </span>
        )}
      </Button>
    </div>
  );
};

export default FloatingCartButton;
