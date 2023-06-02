import { createClient } from '@supabase/supabase-js';

const URL = 'https://qqwofskutazorxmmigcu.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxd29mc2t1dGF6b3J4bW1pZ2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NTEwMTQsImV4cCI6MjAwMTIyNzAxNH0.uP3hYfcQMaRRgYf9Ek_D3UTvkI1PcHEa44WXx1Uwkzw'

export const supabase = createClient(URL, API_KEY);