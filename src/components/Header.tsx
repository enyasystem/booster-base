import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, LogOut, ShoppingCart, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useCartContext } from '@/components/cart/CartProvider';
import { toast } from '@/components/ui/use-toast';

// Define dropdown menu items
const navItems = [
  {
    title: 'Home',
    path: '/',
    dropdown: null
  },
  {
    title: 'About Us',
    path: '/about',
    // dropdown: [
    //   { title: 'Our History', path: '/about#history' },
    //   { title: 'Our Team', path: '/about#team' },
    //   { title: 'Core Values', path: '/about#values' },
    //   { title: 'Our Mission', path: '/about#mission' },
    // ]
  },
  {
    title: 'Services',
    path: '/services',
    // dropdown: [
    //   { title: 'IT Consulting', path: '/services#consulting' },
    //   { title: 'Software Development', path: '/services#software' },
    //   { title: 'Network Solutions', path: '/services#network' },
    //   { title: 'Cybersecurity', path: '/services#security' },
    // ]
  },
  {
    title: 'Training',
    path: '/training',
    // dropdown: [
    //   { title: 'IT Fundamentals', path: '/training#fundamentals' },
    //   { title: 'Professional Certifications', path: '/training#certifications' },
    //   { title: 'Corporate Training', path: '/training#corporate' },
    //   { title: 'Online Courses', path: '/training#online' },
    // ]
  },
  {
    title: 'Products',
    path: '/products',
    // dropdown: [
    //   { title: 'Hardware', path: '/products?category=hardware' },
    //   { title: 'Software', path: '/products?category=software' },
    //   { title: 'Network Equipment', path: '/products?category=network' },
    //   { title: 'Accessories', path: '/products?category=accessories' },
    // ]
  },
  {
    title: 'Contact',
    path: '/contact',
    dropdown: null
  }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { user, isAdmin, checkIsAdmin } = useAuth();
  const { toggleCart, getCartTotal } = useCartContext();
  const navigate = useNavigate();

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
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "Hope to see you again soon!"
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };
  
  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-indigo-900/95 backdrop-blur-sm shadow-sm' : 'bg-indigo-900/80 backdrop-blur-sm'
    }`}>
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
              <div key={index} className="relative" ref={el => dropdownRefs.current[index] = el}>
                <div 
                  className="flex items-center gap-1 text-white/90 hover:text-white transition-colors duration-200 cursor-pointer"
                  onMouseEnter={() => item.dropdown && handleDropdownToggle(index)}
                  onClick={() => navigate(item.path)}
                >
                  <span>{item.title}</span>
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </div>
                
                {item.dropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden animate-fade-in z-50">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1"></div>
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <div key={dropdownIndex} className="relative">
                          <Link
                            to={dropdownItem.path}
                            className="block px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors w-full text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(null);
                              navigate(dropdownItem.path);
                            }}
                          >
                            {dropdownItem.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Animated Apply Button */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScFk7zpJBawWw0Np3yhJSmvNLJhEPktv4XTrJ3ebzlSKFbX4A/viewform?embedded=true&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-training-btn"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              Apply for Government Training
            </a>
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white/90 hover:text-white transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartTotal() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartTotal()}
                </span>
              )}
            </button>
            
            {isAdmin && (
              <Link to="/admin" className="font-medium text-blue-300 hover:text-blue-200">Admin</Link>
            )}
          </div>

          {/* Auth button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white/90 hover:text-white transition-colors md:hidden"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartTotal() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartTotal()}
                </span>
              )}
            </button>
            
            {user ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 border border-white/20 text-white rounded-md hover:bg-indigo-800 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/auth" className="px-6 py-2 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Login
              </Link>
            )}
          </div>

          {/* Mobile items */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white/90 hover:text-white transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getCartTotal() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartTotal()}
                </span>
              )}
            </button>
            
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
              <div key={index} className="py-2">
                <div 
                  className="flex justify-between items-center text-white"
                  onClick={() => item.dropdown ? handleDropdownToggle(index) : navigate(item.path)}
                >
                  <span>{item.title}</span>
                  {item.dropdown && <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />}
                </div>
                
                {item.dropdown && activeDropdown === index && (
                  <div className="mt-2 pl-4 border-l-2 border-blue-500 space-y-2">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.path}
                        className="block py-2 text-blue-200 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                          navigate(dropdownItem.path);
                        }}
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Animated Apply Button for Mobile */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScFk7zpJBawWw0Np3yhJSmvNLJhEPktv4XTrJ3ebzlSKFbX4A/viewform?embedded=true&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-training-btn block text-center mt-2"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              {/* Apply for Government Training */}
            </a>
            
            {isAdmin && (
              <Link to="/admin" className="block py-2 font-medium text-blue-300">Admin</Link>
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
              <Link to="/auth" className="block w-full px-6 py-2  text-white text-center rounded-md hover:bg-blue-700 transition-colors duration-200">
                 {/* Login */}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
