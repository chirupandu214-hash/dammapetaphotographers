import { supabase } from "@/lib/supabase";

export async function deleteMember(id: number) {
  const { error } = await supabase
    .from("members")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
  return data;
}

export async function addMember(member: any) {
  const { error } = await supabase
    .from("members")
    .insert([member]);

  if (error) throw error;
}
