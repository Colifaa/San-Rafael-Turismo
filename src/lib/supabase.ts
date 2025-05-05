import { createClient } from '@supabase/supabase-js'

// Variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!

// Cliente para el frontend (público)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para el backend (service role, solo usar en server)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
