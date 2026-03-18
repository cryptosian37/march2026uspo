import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || supabaseUrl === 'your_supabase_url_here' || !supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('Supabase environment variables are not configured. Please update your .env file.')
}

const isConfigured =
  supabaseUrl &&
  supabaseUrl !== 'your_supabase_url_here' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your_supabase_anon_key_here'

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null