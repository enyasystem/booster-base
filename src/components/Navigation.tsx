import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, LogOut, ShoppingCart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useCartContext } from '@/components/cart/CartProvider';
import { toast } from '@/components/ui/use-toast';
import { useProductContext } from "@/context/ProductContext";

// Define navigation menu items
const navItems = [
  { title: 'Home', path: '/' },
  { title: 'About Us', path: '/about' },
  { title: 'Services', path: '/services' },
  { title: 'Training', path: '/training' },
  { title: 'Products', path: '/products' },
  { title: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, checkIsAdmin } = useAuth();
  const { toggleCart, getCartTotal } = useCartContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check admin status when component mounts
    if (user) {
      checkIsAdmin();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, checkIsAdmin]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "Hope to see you again soon!",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-indigo-900/95 backdrop-blur-sm shadow-sm' : 'bg-indigo-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="hidden md:flex justify-end items-center space-x-6 py-2 px-6 text-sm text-white/80">
          <a href="tel:+2348038913567" className="flex items-center space-x-2 text-white/80 hover:text-white">
            <Phone className="w-4 h-4" />
            <span>+234 803 891 3567</span>
          </a>
          <a href="mailto:info@boosterbaseng.com" className="flex items-center space-x-2 text-white/80 hover:text-white">
            <Mail className="w-4 h-4" />
            <span>info@boosterbaseng.com</span>
          </a>
        </div>

        {/* Main navigation */}
        <nav className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-white">
            Booster Base
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`nav-link${location.pathname === item.path ? ' nav-link-active' : ''}`}
              >
                {item.title}
              </Link>
            ))}

            {isAdmin && (
              <Link to="/admin" className="font-medium text-blue-300 hover:text-blue-200">
                Admin
              </Link>
            )}
          </div>

          {/* Auth button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 border border-white/20 text-white rounded-md hover:bg-indigo-800 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile items */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-indigo-900 border-t border-indigo-800 py-4 px-6 space-y-4 animate-fade-in shadow-lg">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block py-2 text-white hover:text-blue-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {isAdmin && (
              <Link to="/admin" className="block py-2 font-medium text-blue-300">
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-white/20 text-white rounded-md hover:bg-indigo-800 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="block w-full px-6 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
