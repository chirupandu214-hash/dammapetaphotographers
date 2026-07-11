import { supabase } from '../lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// READ: సభ్యుల జాబితా పొందడం
export const useMembers = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data, error } = await supabase.from('members').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });
};

// CREATE: కొత్త సభ్యుని నమోదు
export const useAddMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newMember: any) => {
      const { data, error } = await supabase.from('members').insert([newMember]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] })
  });
};
