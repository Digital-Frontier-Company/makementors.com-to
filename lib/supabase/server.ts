import { createClient } from "@supabase/supabase-js"

// Create a Supabase client for server-side use with admin privileges
export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
