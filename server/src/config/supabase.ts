import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase Environment Variables in Server!');
}

// Service Role Key వాడుతున్నాం కాబట్టి ఇది RLS ని బైపాస్ చేసి అడ్మిన్ లాగా పనిచేస్తుంది
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
