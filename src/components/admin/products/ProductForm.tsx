
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Upload } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
  product?: any;
}

// Define a schema that matches the database requirements, making description and image optional
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().optional(), // Made optional
  price_range: z.string().min(1, { message: "Price range is required." }),
  category_id: z.string().min(1, { message: "Category is required." }),
  is_featured: z.boolean().default(false),
  image_url: z.string().optional(), // Made optional
  features: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof formSchema>;

const ProductForm = ({ isOpen, onClose, onSuccess, categories, product }: ProductFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Debug: Log categories when rendered
  console.log('Categories passed to ProductForm:', categories);

  const defaultValues: ProductFormValues = product ? {
    ...product,
    features: product.features || [],
  } : {
    name: '',
    description: '',
    price_range: '',
    category_id: '',
    is_featured: false,
    image_url: '',
    features: [],
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      // Update the form value
      form.setValue('image_url', publicUrl);
      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and will be used for this product."
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: `There was an error uploading your image: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure price range includes Naira symbol
      const formattedValues = {
        ...values,
        price_range: values.price_range.includes('₦') ? values.price_range : `₦${values.price_range}`
      };

      console.log('Saving product with values:', formattedValues);
      
      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(formattedValues)
          .eq('id', product.id);
        
        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert({
            name: formattedValues.name,
            description: formattedValues.description || null, // Handle null for optional field
            price_range: formattedValues.price_range,
            category_id: formattedValues.category_id,
            features: formattedValues.features,
            is_featured: formattedValues.is_featured,
            image_url: formattedValues.image_url || null // Handle null for optional field
          });
        
        if (error) throw error;
      }
      
      toast({
        title: product ? "Product Updated" : "Product Created",
        description: `Product has been ${product ? "updated" : "created"} successfully.`,
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: `Failed to save product: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues('features') || [];
      form.setValue('features', [...currentFeatures, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues('features') || [];
    form.setValue('features', currentFeatures.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            Fill out the form below to {product ? 'update' : 'create'} a product. 
            Only name, price range, and category are required.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Range (₦) <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 10,000-50,000" 
                      {...field} 
                      onChange={(e) => {
                        // Remove any existing Naira symbols to prevent duplication
                        const value = e.target.value.replace(/₦/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-muted-foreground">
                          No categories available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Upload Image (Optional)</FormLabel>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                <div className="flex flex-col items-center justify-center">
                  {isUploading ? (
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                  ) : (
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  )}
                  <p className="text-sm mb-2">Drag & drop an image here, or click to select</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4 file:rounded-md
                      file:border-0 file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:bg-primary/90 cursor-pointer"
                    onChange={onFileChange}
                    disabled={isUploading}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Max file size: 10MB. Supported formats: JPEG, PNG, GIF
                  </p>
                </div>
              </div>
              {form.watch('image_url') && (
                <div className="mt-2">
                  <p className="text-sm text-primary mb-2">
                    Image uploaded successfully
                  </p>
                  <div className="w-full h-40 relative">
                    <img 
                      src={form.watch('image_url')}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Featured Product</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Features (Optional)</FormLabel>
              <div className="flex">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  className="mr-2"
                />
                <Button type="button" onClick={addFeature}>Add</Button>
              </div>
              
              <div className="mt-2 space-y-2">
                {form.watch('features')?.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span>{feature}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
