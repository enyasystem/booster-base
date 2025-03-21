BEGIN;

-- Disable RLS temporarily
ALTER TABLE storage.buckets SECURITY DEFINER;
ALTER TABLE storage.objects SECURITY DEFINER;

-- Enable RLS on storage.buckets
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Create policies for storage.buckets
CREATE POLICY "Allow public bucket creation" ON storage.buckets
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public bucket select" ON storage.buckets
FOR SELECT USING (true);

-- Create bucket policies
CREATE POLICY "Allow public bucket selection" 
ON storage.buckets FOR SELECT 
TO PUBLIC 
USING (true);

CREATE POLICY "Allow authenticated bucket creation" 
ON storage.buckets FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Create policies for buckets
CREATE POLICY "Enable read access for all users" ON storage.buckets
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON storage.buckets
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for storage.objects
CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated users to upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow owners to update" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'blog-images' 
  AND owner = auth.uid()
);

CREATE POLICY "Allow owners to delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'blog-images' 
  AND owner = auth.uid()
);

-- Create object policies
CREATE POLICY "Allow public object selection" 
ON storage.objects FOR SELECT 
TO PUBLIC 
USING (bucket_id = 'blog-images');

CREATE POLICY "Allow authenticated object insertion" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Allow individual object updates" 
ON storage.objects FOR UPDATE 
TO PUBLIC 
USING (auth.uid() = owner);

CREATE POLICY "Allow individual object deletions" 
ON storage.objects FOR DELETE 
TO PUBLIC 
USING (auth.uid() = owner);

-- Create policies for objects
CREATE POLICY "Enable read access for all users" ON storage.objects
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON storage.objects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

COMMIT;
