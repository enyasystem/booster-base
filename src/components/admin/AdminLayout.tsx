import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AccessDenied } from './AccessDenied';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  GraduationCap,
  UserCog,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const AdminLayout = () => {
  const { user, isAdmin, loading, checkIsAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    
    // Re-check admin status when the component mounts
    if (user) {
      checkIsAdmin();
    }

    // If not logged in, redirect to auth page
    if (!loading && !user) {
      toast({
        title: "Access Denied",
        description: "You must login as admin before you can access this page.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [location.pathname, user, checkIsAdmin, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out."
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again."
      });
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/admin' && location.pathname.startsWith(path));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-center text-gray-600 mb-6">
          You must login as admin before you can access this page.
        </p>
        <Button onClick={() => navigate('/auth')}>
          {/* Login */}
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    // { path: '/admin/content', label: 'Content', icon: <FileText className="h-5 w-5" /> },
    // { path: '/admin/news', label: 'News', icon: <Newspaper className="h-5 w-5" /> },
    { path: '/admin/products', label: 'Products', icon: <Package className="h-5 w-5" /> },
    { path: '/admin/training-registrations', label: 'Training', icon: <GraduationCap className="h-5 w-5" /> },
    { path: '/admin/training-photo-management', label: 'Training Photos', icon: <FileText className="h-5 w-5" /> },
    { path: '/admin/users', label: 'User Management', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/account', label: 'Account', icon: <UserCog className="h-5 w-5" /> },
    // { path: '/admin/blog', label: 'Blog', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex flex-col w-64 border-r bg-background">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path) 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-muted'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t mt-auto">
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={() => window.open('/', '_blank')}
            >
              <Home className="mr-2 h-4 w-4" />
              View Website
            </Button>
            <Button 
              variant="outline" 
              className="justify-start text-destructive hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-64 max-w-xs bg-background">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.path) 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t mt-auto">
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  onClick={() => window.open('/', '_blank')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  View Website
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
