// Supabase client setup
// This file initializes the connection to the Supabase project
// and exports the client so any module can import and use it.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
// Public URL of the Supabase project
const SUPABASE_URL = 'https://rlhzzasruvzzwfkrwomp.supabase.co'
// Anon public key — safe to expose on the client side.
// Access is controlled by RLS policies in Supabase, not by hiding this key.
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsaHp6YXNydXZ6endma3J3b21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTg5MjAsImV4cCI6MjA5NjkzNDkyMH0.n4EKF9FwGu7yijhkdY8fJ9pJWCD4d45BqjJriwcxcXw'
// Supabase client instance shared across the entire app.
// Import { db } wherever you need to query the database or handle auth.
export const db = createClient(SUPABASE_URL, SUPABASE_KEY)