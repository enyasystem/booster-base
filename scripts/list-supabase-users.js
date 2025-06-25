// Node.js script to list all Supabase Auth users and their emails using the Supabase Admin API
// Usage: node scripts/list-supabase-users.js

const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase project URL and service role key
const SUPABASE_URL = process.env.SUPABASE_URL || '<YOUR_SUPABASE_URL>';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '<YOUR_SERVICE_ROLE_KEY>';

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function listUsers() {
  let page = 1;
  let users = [];
  let done = false;
  while (!done) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 100 });
    if (error) {
      console.error('Error fetching users:', error.message);
      process.exit(1);
    }
    users = users.concat(data.users);
    if (data.users.length < 100) done = true;
    else page++;
  }
  users.forEach(u => {
    console.log(`ID: ${u.id} | Email: ${u.email} | Created: ${u.created_at}`);
  });
  console.log(`\nTotal users: ${users.length}`);
}

listUsers();
