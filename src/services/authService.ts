import { supabase } from "@/lib/supabase";


export async function loginUser(
  mobile:string,
  password:string
){

const {data,error}=await supabase
.from("members")
.select("*")
.eq("mobile",mobile)
.eq("password",password)
.single();


if(error){

throw error;

}


return data;

}
