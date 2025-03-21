import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '../.env') })

// Use service role key for admin operations
const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ACCESS_TOKEN,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
)

async function createBucket() {
  try {
    console.log('Creating blog-images bucket...')
    
    // First check if bucket exists
    const { data: buckets, error: listError } = await supabaseAdmin
      .storage
      .listBuckets()

    if (listError) throw listError

    const existingBucket = buckets?.find(b => b.name === 'blog-images')
    if (existingBucket) {
      console.log('✅ Blog images bucket already exists')
      return
    }

    // Create bucket if it doesn't exist
    const { data, error } = await supabaseAdmin
      .storage
      .createBucket('blog-images', {
        public: true,
        fileSizeLimit: 5242880,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      })

    if (error) throw error
    console.log('✅ Blog images bucket created:', data)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('Stack:', error.stack)
  }
}

createBucket()
