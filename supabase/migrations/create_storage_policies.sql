-- Create policies for blog-images bucket
DO $$
BEGIN
  -- Allow public read access
  EXECUTE format(
    'CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = ''blog-images'');'
  );

  -- Allow authenticated users to upload
  EXECUTE format(
    'CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = ''blog-images'' AND auth.role() = ''authenticated'');'
  );

  -- Allow owners to update and delete their files
  EXECUTE format(
    'CREATE POLICY "Owner Upload" ON storage.objects FOR UPDATE USING (bucket_id = ''blog-images'' AND auth.uid() = owner);'
  );
  
  EXECUTE format(
    'CREATE POLICY "Owner Delete" ON storage.objects FOR DELETE USING (bucket_id = ''blog-images'' AND auth.uid() = owner);'
  );
END $$;
