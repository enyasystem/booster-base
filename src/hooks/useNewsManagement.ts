import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import type { NewsPost, NewsFormData } from '@/types/news';
import { useAuth } from '@/hooks/useAuth';

export function useNewsManagement() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  // Fetch news posts
  const { 
    data: newsPosts, 
    isLoading, 
    error: fetchError 
  } = useQuery({
    queryKey: ['adminNewsPosts'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('news_posts')
          .select('*')
          .order('published_at', { ascending: false });
        
        if (error) throw error;
        return data as NewsPost[];
      } catch (error: any) {
        console.error("Error fetching news posts:", error);
        throw new Error(`Failed to fetch news posts: ${error.message}`);
      }
    },
    enabled: !!user && isAdmin // Only fetch if user is logged in and is admin
  });

  // Generate a unique slug from title
  const generateUniqueSlug = (title: string) => {
    // Basic slug generation
    const baseSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Add timestamp to ensure uniqueness
    const timestamp = new Date().getTime().toString().slice(-6);
    return `${baseSlug}-${timestamp}`;
  };

  // Create news post mutation
  const createNewsMutation = useMutation({
    mutationFn: async (data: NewsFormData) => {
      try {
        // Always generate a new unique slug when creating a news post
        const slug = generateUniqueSlug(data.title);
        
        console.log("Creating news post with slug:", slug);
        
        const { error } = await supabase
          .from('news_posts')
          .insert([{ 
            ...data,
            slug: slug, // Use the generated unique slug
            author: user?.id // Set the author to the current user ID
          }]);
        
        if (error) {
          console.error("Error creating news post:", error);
          throw error;
        }
        return true;
      } catch (error: any) {
        console.error("Detailed error:", error);
        throw new Error(`Failed to create news post: ${error.message}`);
      }
    },
    onSuccess: () => {
      // Invalidate both admin news posts and published news queries
      queryClient.invalidateQueries({ queryKey: ['adminNewsPosts'] });
      queryClient.invalidateQueries({ queryKey: ['published-news'] });
      toast({ title: "Success", description: "News post created successfully" });
    },
    onError: (error: any) => {
      console.error("Detailed error:", error);
      toast({ 
        title: "Error", 
        description: `Failed to create news post: ${error.message}`, 
        variant: "destructive" 
      });
    }
  });

  // Update news post mutation
  const updateNewsMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: NewsFormData }) => {
      try {
        // Keep the existing slug if provided, otherwise generate a new one
        const updateData = {
          ...data,
          // Only generate a new slug if title changed and no slug is provided
          slug: data.slug || generateUniqueSlug(data.title)
        };
        
        const { error } = await supabase
          .from('news_posts')
          .update(updateData)
          .eq('id', id);
        
        if (error) throw error;
        return true;
      } catch (error: any) {
        console.error("Error updating news post:", error);
        throw new Error(`Failed to update news post: ${error.message}`);
      }
    },
    onSuccess: () => {
      // Invalidate both admin news posts and published news queries
      queryClient.invalidateQueries({ queryKey: ['adminNewsPosts'] });
      queryClient.invalidateQueries({ queryKey: ['published-news'] });
      toast({ title: "Success", description: "News post updated successfully" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: `Failed to update news post: ${error.message}`, 
        variant: "destructive" 
      });
    }
  });

  // Simplified delete news post mutation
  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting news post with ID:", id);
      
      const { error } = await supabase
        .from('news_posts')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting news post:", error);
        throw error;
      }
      
      return id;
    },
    onSuccess: (deletedId) => {
      // Update local cache to remove deleted item immediately
      queryClient.setQueryData(['adminNewsPosts'], (oldData: NewsPost[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(post => post.id !== deletedId);
      });
      
      // Also invalidate queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['adminNewsPosts'] });
      queryClient.invalidateQueries({ queryKey: ['published-news'] });
      
      toast({ 
        title: "Success", 
        description: "News post deleted successfully" 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: `Failed to delete news post: ${error.message}`, 
        variant: "destructive" 
      });
    }
  });

  return {
    newsPosts: newsPosts || [],
    isLoading,
    fetchError,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
    isAdmin,
    user
  };
}
