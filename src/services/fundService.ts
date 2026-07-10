import { supabase } from "@/lib/supabase";


export async function getFunds(){

  const {data,error}=await supabase
    .from("fund_collections")
    .select("*")
    .order("id",{ascending:false});


  if(error) throw error;


  return data ?? [];

}



export async function getNextReceiptNo(){

  const {data,error}=await supabase
    .from("fund_collections")
    .select("receipt_no")
    .order("id",{ascending:false})
    .limit(1);


  if(error) throw error;



  if(!data || data.length===0){

    return "DPA-F001";

  }



  const last =
    data[0].receipt_no;


  const number =
    parseInt(
      last.replace("DPA-F","")
    ) + 1;



  return (
    "DPA-F" +
    number
    .toString()
    .padStart(3,"0")
  );

}



export async function addFund(
 fund:any
){

 const {error}=await supabase
 .from("fund_collections")
 .insert([fund]);


 if(error) throw error;

}
