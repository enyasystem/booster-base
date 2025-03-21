import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

// Log environment variables (without sensitive data)
console.log('Environment check:', {
  hasUrl: !!process.env.VITE_SUPABASE_URL,
  hasKey: !!process.env.VITE_SUPABASE_ANON_KEY
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function createBlogImagesBucket() {
  try {
    // First authenticate as service role
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: process.env.SUPABASE_AUTH_EMAIL,
      password: process.env.SUPABASE_AUTH_PASSWORD
    });

    if (authError) throw authError;

    console.log('Creating blog-images bucket...');
    
    // Check if bucket exists first
    const { data: existingBuckets, error: listError } = await supabase
      .storage
      .listBuckets();

    if (listError) throw listError;

    const bucketExists = existingBuckets.some(bucket => bucket.name === 'blog-images');
    
    if (bucketExists) {
      console.log('ℹ️ Blog images bucket already exists');
      return;
    }

    const { data, error } = await supabase
      .storage
      .createBucket('blog-images', {
        public: true,
        fileSizeLimit: 5242880,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      });

    if (error) throw error;
    
    console.log('✅ Blog images bucket created successfully:', data);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

createBlogImagesBucket()
  .catch(console.error)
  .finally(() => process.exit());
