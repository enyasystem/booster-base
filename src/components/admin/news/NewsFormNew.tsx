
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, ImageIcon } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  status: z.enum(['draft', 'published']),
  image_url: z.string().optional(),
  slug: z.string().optional()
});

interface NewsFormNewProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

const NewsFormNew = ({ isOpen, onClose, onSuccess, initialData }: NewsFormNewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Generate a unique slug from title
  const generateUniqueSlug = (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const timestamp = new Date().getTime().toString().slice(-6);
    return `${baseSlug}-${timestamp}`;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      content: initialData.content,
      excerpt: initialData.excerpt || "",
      status: initialData.status,
      image_url: initialData.image_url || "",
      slug: initialData.slug
    } : {
      title: "",
      content: "",
      excerpt: "",
      status: "draft",
      image_url: "",
      slug: ""
    }
  });

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `news/${fileName}`;
      
      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        toast({
          title: "Upload failed",
          description: uploadError.message,
          variant: "destructive"
        });
        return;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      // Update form value
      form.setValue('image_url', publicUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded"
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // If no slug is provided, generate one from the title
      if (!values.slug) {
        values.slug = generateUniqueSlug(values.title);
      }
      
      if (initialData) {
        // Update existing news post
        const { error } = await supabase
          .from('news_posts')
          .update({
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            status: values.status,
            image_url: values.image_url,
            slug: values.slug,
            updated_at: new Date().toISOString() // Convert Date to string
          })
          .eq('id', initialData.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "News post updated successfully"
        });
      } else {
        // Create new news post
        const { error } = await supabase
          .from('news_posts')
          .insert({  // Changed from array to single object
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            status: values.status,
            image_url: values.image_url,
            slug: values.slug,
            published_at: values.status === 'published' ? new Date().toISOString() : null // Convert Date to string
          });
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "News post created successfully"
        });
      }
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit News Post" : "Create News Post"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to the existing news post"
              : "Add a new news post to your website"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="News post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A brief summary of the news post" 
                      className="h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="The full content of the news post" 
                      className="h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Image</FormLabel>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-col items-center">
                  {form.watch('image_url') ? (
                    <div className="relative w-full h-40 mb-4">
                      <img 
                        src={form.watch('image_url')} 
                        alt="News preview" 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-md p-8 mb-4 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                      file:rounded-md file:border-0 file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary 
                      hover:file:bg-primary-100 cursor-pointer"
                    disabled={isUploading}
                  />
                  
                  {isUploading && (
                    <div className="flex items-center mt-2">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isUploading}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsFormNew;
