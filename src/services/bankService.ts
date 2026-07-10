import { supabase } from "@/lib/supabase";


export async function getTransactions(){

  const {data,error}=await supabase
    .from("bank_transactions")
    .select("*")
    .order("id",{ascending:false});


  if(error) throw error;


  return data ?? [];

}



export async function getNextTransactionNo(){

 const {data,error}=await supabase
 .from("bank_transactions")
 .select("transaction_no")
 .order("id",{ascending:false})
 .limit(1);


 if(error) throw error;


 if(!data || data.length===0){

   return "DPA-T001";

 }


 const last=data[0].transaction_no;


 const number =
 parseInt(
 last.replace("DPA-T","")
 ) + 1;



 return (
 "DPA-T" +
 number
 .toString()
 .padStart(3,"0")
 );


}



export async function addTransaction(
 transaction:any
){

 const {error}=await supabase
 .from("bank_transactions")
 .insert([transaction]);


 if(error) throw error;

}
