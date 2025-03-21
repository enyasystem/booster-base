import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import News from "./pages/News";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
// import ContentManagement from "./pages/admin/ContentManagement";
// import NewsManagement from "./pages/admin/NewsManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import TrainingRegistrations from "./pages/admin/TrainingRegistrations";
import AccountSettings from "./pages/admin/AccountSettings";
// import NewsDetail from './pages/NewsDetail';
import ProductDetail from './components/products/ProductDetail';
import { ProductsProvider } from '@/context/ProductsContext';
// import BlogManagement from '@/components/admin/BlogManagement';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles/carousel.css';
import './styles/testimonial-carousel.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ShoppingCart />
              <GoToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/training" element={<Training />} />
                {/* <Route path="/news" element={<News />} /> */}
                <Route path="/checkout" element={<Checkout />} />
                
                {/* <Route path="/news/:slug" element={<NewsDetail />} /> */}
                <Route path="/products/:id" element={<ProductDetail />} />
                
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  {/* <Route path="content" element={<ContentManagement />} /> */}
                  {/* <Route path="news" element={<NewsManagement />} /> */}
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="training-registrations" element={<TrainingRegistrations />} />
                  <Route path="account" element={<AccountSettings />} />
                  {/* <Route path="blog" element={<BlogManagement />} /> */}
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
