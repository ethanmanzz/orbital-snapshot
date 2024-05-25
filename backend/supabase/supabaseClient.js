import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pqwbyjnyiffsgbhjzpof.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxd2J5am55aWZmc2diaGp6cG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNDEyNzMsImV4cCI6MjAzMTYxNzI3M30.-tDUTVaT1Wkcr6xL7GOwh1467xhguH0825hYohCTqzM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
