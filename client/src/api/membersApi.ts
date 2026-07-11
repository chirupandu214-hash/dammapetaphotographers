import { supabase } from '../lib/supabase';

// సభ్యులను పొందడానికి (Read)
export const getMembers = async () => {
  const { data, error } = await supabase.from('members').select('*');
  return data;
};

// అప్‌డేట్ చేయడానికి (Update)
export const updateMember = async (id: string, updates: any) => {
  const { data, error } = await supabase.from('members').update(updates).eq('id', id);
  return data;
};
