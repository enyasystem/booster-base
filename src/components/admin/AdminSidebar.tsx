import { Link, useLocation } from 'react-router-dom';
import { Users, Home, ShoppingBag, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminSidebar() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  if (!isAdmin) return null;
  return (
    <aside className="w-64 bg-indigo-900 text-white min-h-screen p-6 space-y-6">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className={location.pathname === '/admin' ? 'font-semibold text-blue-300' : ''}>
          <Home className="inline w-4 h-4 mr-2" /> Dashboard
        </Link>
        <Link to="/admin/UserManagement" className={location.pathname === '/admin/UserManagement' ? 'font-semibold text-blue-300' : ''}>
          <Users className="inline w-4 h-4 mr-2" /> User Management
        </Link>
        <Link to="/admin/products" className={location.pathname === '/admin/products' ? 'font-semibold text-blue-300' : ''}>
          <ShoppingBag className="inline w-4 h-4 mr-2" /> Products
        </Link>
        <Link to="/admin/training-registrations" className={location.pathname === '/admin/training-registrations' ? 'font-semibold text-blue-300' : ''}>
          <GraduationCap className="inline w-4 h-4 mr-2" /> Training Registrations
        </Link>
      </nav>
    </aside>
  );
}
