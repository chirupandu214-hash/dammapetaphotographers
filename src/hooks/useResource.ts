import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useResource(
  table: string,
  search: string,
  searchable: string[],
) {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: [table, search],
    queryFn: async () => {
      let query = supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });

      if (search.trim() && searchable.length) {
        query = query.or(
          searchable.map((field) => `${field}.ilike.%${search}%`).join(","),
        );
      }

      const { data, error } = await query;

      if (error) throw error;

      return data ?? [];
    },
  });

  const create = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      const { error } = await supabase.from(table).insert(values);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });

  const update = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: Record<string, unknown>;
    }) => {
      const { error } = await supabase.from(table).update(values).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });

  return {
    list,
    create,
    update,
    remove,
  };
}
