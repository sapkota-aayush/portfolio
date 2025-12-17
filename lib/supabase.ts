import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lokpvhvlqkoxcivgpsvn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxva3B2aHZscWtveGNpdmdwc3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MDE0NDQsImV4cCI6MjA4MDk3NzQ0NH0.8OCZtIZrn0xA_IamsWuJ5DeuES9XKWG-KxIPjszA12k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

