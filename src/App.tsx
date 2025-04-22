import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/components/cart/CartProvider";
import ShoppingCart from "@/components/cart/ShoppingCart";
import GoToTop from "@/components/GoToTop";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Training from "./pages/Training";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import TrainingRegistrations from "./pages/admin/TrainingRegistrations";
import AccountSettings from "./pages/admin/AccountSettings";
import ProductDetail from './components/products/ProductDetail';
import { ProductsProvider } from '@/context/ProductsContext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Enterprise from './pages/Enterprise';
import { ProductProvider, useProductContext } from "@/context/ProductContext";
import { supabase } from "@/integrations/supabase/client";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/carousel.css';
import './styles/testimonial-carousel.css';

const queryClient = new QueryClient();

function ProductLoader() {
  const { setProducts } = useProductContext();
  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data || []);
    };
    fetchAllProducts();
  }, [setProducts]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <ProductProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ShoppingCart />
                <GoToTop />
                <ScrollToTop />
                <ProductLoader /> {/* <-- This is now inside the provider */}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/training" element={<Training />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-use" element={<TermsOfUse />} />
                  <Route path="/enterprise" element={<Enterprise />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="training-registrations" element={<TrainingRegistrations />} />
                    <Route path="account" element={<AccountSettings />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ProductProvider>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
