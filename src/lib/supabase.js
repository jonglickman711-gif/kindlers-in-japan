import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function isValidSupabaseUrl(value) {
  if (!value) return false

  try {
    const url = new URL(value)
    return url.hostname.endsWith('.supabase.co') || url.hostname === 'localhost'
  } catch {
    return false
  }
}

export const hasSupabaseConfig = Boolean(
  isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey,
)

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (supabaseUrl && !isValidSupabaseUrl(supabaseUrl)) {
  console.error(
    '[Supabase] VITE_SUPABASE_URL must be the project API URL, like https://your-project.supabase.co. Dashboard URLs will not work.',
  )
}
