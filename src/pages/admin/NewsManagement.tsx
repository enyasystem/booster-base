
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AccessDenied } from '@/components/admin/AccessDenied';
import { FetchError } from '@/components/admin/FetchError';
import { NewsTable } from '@/components/admin/news/NewsTable';
import { DeleteDialog } from '@/components/admin/news/DeleteDialog';
import { useToast } from '@/components/ui/use-toast';
import NewsForm from '@/components/admin/news/NewsForm';
import type { NewsPost } from '@/types/news';

const NewsManagement = () => {
  const { checkIsAdmin } = useAuth();
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsPost | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const verifyAdmin = async () => {
      const isAdminUser = await checkIsAdmin();
      setIsAdmin(isAdminUser);
      setAdminChecked(true);
    };
    
    verifyAdmin();
  }, [checkIsAdmin]);

  // Fetch news posts
  const { data: newsPosts, isLoading, error, refetch } = useQuery({
    queryKey: ['adminNewsPosts'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as NewsPost[];
      } catch (error: any) {
        console.error("Error fetching news posts:", error);
        throw new Error(`Failed to fetch news posts: ${error.message}`);
      }
    },
    enabled: isAdmin
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNewsPosts'] });
      queryClient.invalidateQueries({ queryKey: ['published-news'] });
      toast({
        title: "Success",
        description: "News post deleted successfully"
      });
      setIsDeleteDialogOpen(false);
      setSelectedNews(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to delete: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const handleOpenEditDialog = (news: NewsPost) => {
    setSelectedNews(news);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (news: NewsPost) => {
    setSelectedNews(news);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedNews) {
      deleteMutation.mutate(selectedNews.id);
    }
  };

  // If the admin status is still being checked, show a loading indicator
  if (!adminChecked) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If the user is not logged in or not an admin
  if (!isAdmin) {
    return <AccessDenied />;
  }

  if (error) {
    return <FetchError message={(error as Error).message} queryKey={['adminNewsPosts']} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">News Management</h1>
        
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add News
        </Button>
      </div>

      {/* Create News Form */}
      <NewsForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          refetch();
        }}
      />
      
      {/* Edit News Form */}
      {selectedNews && (
        <NewsForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedNews(null);
          }}
          onSuccess={() => {
            setIsEditModalOpen(false);
            setSelectedNews(null);
            refetch();
          }}
          initialData={selectedNews}
        />
      )}

      {/* Delete confirmation dialog */}
      <DeleteDialog 
        selectedNews={selectedNews}
        isDeleting={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isOpen={isDeleteDialogOpen}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <NewsTable 
          newsPosts={newsPosts || []}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
      )}
    </div>
  );
};

export default NewsManagement;
