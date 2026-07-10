import { supabase } from "@/lib/supabase";

export async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
}

export async function addMember(member: any) {
  const { error } = await supabase
    .from("members")
    .insert([member]);

  if (error) throw error;
}
