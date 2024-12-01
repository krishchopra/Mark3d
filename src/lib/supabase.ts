import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

// var supa = "https://aqmzimafjvisudlvwrlb.supabase.co"
// var key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbXppbWFmanZpc3VkbHZ3cmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMDY3OTcsImV4cCI6MjA0ODU4Mjc5N30.58tLU0WZloNvuWkYH8MYFdRSU5SMW7G-C2HDbLAcF5I"


export const supabase = createClient("https://aqmzimafjvisudlvwrlb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbXppbWFmanZpc3VkbHZ3cmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMDY3OTcsImV4cCI6MjA0ODU4Mjc5N30.58tLU0WZloNvuWkYH8MYFdRSU5SMW7G-C2HDbLAcF5I", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
