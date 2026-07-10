import { supabase } from "@/lib/supabase";


export async function getMemberReport() {

  const { data, error } =
    await supabase
      .from("members")
      .select("*")
      .order("id", {
        ascending: false,
      });


  if (error) throw error;


  return data ?? [];

}



export async function getFundReport() {

  const { data, error } =
    await supabase
      .from("fund_collections")
      .select("*")
      .order("id", {
        ascending: false,
      });


  if (error) throw error;


  return data ?? [];

}



export async function getBankReport() {

  const { data, error } =
    await supabase
      .from("bank_transactions")
      .select("*")
      .order("id", {
        ascending: false,
      });


  if (error) throw error;


  return data ?? [];

}
