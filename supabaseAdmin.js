import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const isConfigured =
  supabaseUrl &&
  supabaseUrl !== 'your_supabase_url_here' &&
  supabaseServiceKey &&
  supabaseServiceKey !== 'your_supabase_service_role_key_here'

export const supabaseAdmin = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null