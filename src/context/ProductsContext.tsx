import { createContext, useContext, ReactNode } from 'react';

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
  // ...existing products...
];

interface ProductsContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const getProductById = (id: string) => {
    return recommendedProducts.find(product => product.id === id);
  };

  return (
    <ProductsContext.Provider value={{ products: recommendedProducts, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
