import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Client-side singleton
export const supabaseClient = createClientComponentClient<Database>()

// Helper function to get the current session
export const getCurrentSession = async () => {
  const supabase = createClientComponentClient<Database>()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  return session
}

// Helper function to get the current user
export const getCurrentUser = async () => {
  const session = await getCurrentSession()
  return session?.user ?? null
}

// Server-side client
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) 