import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ContentManagement from "@/pages/admin/ContentManagement";
import NewsManagement from "@/pages/admin/NewsManagement";
import ProductManagement from "@/pages/admin/ProductManagement";
import TrainingRegistrations from "@/pages/admin/TrainingRegistrations";
import AccountSettings from "@/pages/admin/AccountSettings";
import UserManagement from "@/pages/admin/UserManagement";
import TrainingPhotoManagement from "@/pages/admin/TrainingPhotoManagement";

const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: 'content',
        element: <ContentManagement />
      },
      {
        path: 'news',
        element: <NewsManagement />
      },
      {
        path: 'products',
        element: <ProductManagement />
      },
      {
        path: 'training',
        element: <TrainingRegistrations />
      },
      {
        path: 'settings',
        element: <AccountSettings />
      },
      {
        path: 'users',
        element: <UserManagement />
      },
      {
        path: 'training-photo-management',
        element: <TrainingPhotoManagement />
      }
    ]
  }
];

export default adminRoutes;
