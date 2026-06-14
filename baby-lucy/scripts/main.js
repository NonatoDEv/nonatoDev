import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://rlhzzasruvzzwfkrwomp.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsaHp6YXNydXZ6endma3J3b21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTg5MjAsImV4cCI6MjA5NjkzNDkyMH0.n4EKF9FwGu7yijhkdY8fJ9pJWCD4d45BqjJriwcxcXw'

export const db = createClient(SUPABASE_URL, SUPABASE_KEY)