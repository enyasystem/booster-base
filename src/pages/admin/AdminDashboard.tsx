import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, FileText, Newspaper, BarChart2, GraduationCap, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const [
        { count: usersCount },
        { count: productsCount },
        // { count: contentCount },
        // { count: newsCount },
        { count: trainingCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        // supabase.from('content_management').select('*', { count: 'exact', head: true }),
        // supabase.from('news_posts').select('*', { count: 'exact', head: true }),
        (supabase as any).from('training_registrations').select('*', { count: 'exact', head: true })
      ]);

      return {
        users: usersCount || 0,
        products: productsCount || 0,
        // content: contentCount || 0,
        // news: newsCount || 0,
        training: trainingCount || 0
      };
    }
  });

  const { data: isSuperAdmin } = useQuery({
    queryKey: ['isSuperAdmin'],
    queryFn: async () => {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('is_super_admin')
        .single();
      return roles?.is_super_admin || false;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2 items-center">
            <div className="text-sm text-muted-foreground">
              {isSuperAdmin ? 'Super Admin' : 'Admin'} Access
            </div>
            <Button onClick={() => window.open('/', '_blank')} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              View Website
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.users || 0}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.products || 0}</div>
              <p className="text-xs text-muted-foreground">Active products</p>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Content Items</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.content || 0}</div>
              <p className="text-xs text-muted-foreground">Published content</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">News Articles</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.news || 0}</div>
              <p className="text-xs text-muted-foreground">Published news</p>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Registrations</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.training || 0}</div>
              <p className="text-xs text-muted-foreground">Course registrations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                No recent activity to display
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigate('/admin/products')}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              {/* <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigate('/admin/content')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Create Content
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigate('/admin/news')}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Post News
              </Button> */}
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigate('/admin/training-registrations')}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Training Registrations
              </Button>
              {isSuperAdmin && (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigate('/admin/Users')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Admins
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
