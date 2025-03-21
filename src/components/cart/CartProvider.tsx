import { createContext, useContext, ReactNode } from 'react';
import { useCart, CartItem } from '@/hooks/useCart';

interface CartContextType {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Omit<CartItem, 'quantity'>, showCart?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  toggleCart: () => void;
}

const CartContext = createContext<{
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Omit<CartItem, 'quantity'>, showCart?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  toggleCart: () => void;
}>({
  cart: [],
  cartOpen: false,
  setCartOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  toggleCart: () => {}
});

export function CartProvider({ children }: { children: ReactNode }) {
  const cartUtils = useCart();
  
  return (
    <CartContext.Provider value={cartUtils}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
