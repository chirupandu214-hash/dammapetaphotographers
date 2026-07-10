import { supabase } from "@/lib/supabase";

export async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function getNextMemberId() {
  const { data, error } = await supabase
    .from("members")
    .select("member_id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) throw error;

  if (!data || data.length === 0) {
    return "DPA0001";
  }

  const lastId = data[0].member_id as string;

  const number = parseInt(lastId.replace("DPA", ""), 10) + 1;

  return `DPA${number.toString().padStart(4, "0")}`;
}

export async function addMember(member: any) {
  const { error } = await supabase
    .from("members")
    .insert([member]);

  if (error) throw error;
}
