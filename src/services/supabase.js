import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gdshxmhfjtosocwadovm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdkc2h4bWhmanRvc29jd2Fkb3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MzM0MjQsImV4cCI6MjAxOTEwOTQyNH0.7Jt_GwP6oFJV3aa2KejervtNGX_se88sMUdhLrluZTw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
