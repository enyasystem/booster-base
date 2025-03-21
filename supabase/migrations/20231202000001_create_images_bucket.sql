
-- Create a storage bucket for images (if it doesn't already exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Add storage policies for public access
CREATE POLICY "Images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'images');

-- Add policy for authenticated users to upload
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images' AND auth.uid() = owner);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'images' AND auth.uid() = owner);

-- Add an explicit policy for anonymous uploads (if needed)
CREATE POLICY "Public can upload images" 
ON storage.objects 
FOR INSERT 
TO anon 
WITH CHECK (bucket_id = 'images');
