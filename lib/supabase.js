import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] SUPABASE_URL or SUPABASE_ANON_KEY is not set. Check your environment configuration.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function fetchAllItems() {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function insertItem(payload) {
  const { data, error } = await supabase.from('items').insert(payload).select().single();
  return { data, error };
}

export async function fetchItemsByOwner(ownerId) {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  return { data, error };
}

