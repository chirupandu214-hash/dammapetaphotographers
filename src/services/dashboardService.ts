import { supabase } from "@/lib/supabase";


export async function getDashboardStats(){

  const { data: members, error } =
    await supabase
      .from("members")
      .select(
        "id,status,role,join_date"
      );


  if(error){
    throw error;
  }


  const totalMembers =
    members?.length || 0;


  const activeMembers =
    members?.filter(
      (m)=>m.status==="Active"
    ).length || 0;


  const inactiveMembers =
    members?.filter(
      (m)=>m.status==="Inactive"
    ).length || 0;


  const admins =
    members?.filter(
      (m)=>m.role==="Admin"
    ).length || 0;



  return {

    totalMembers,

    activeMembers,

    inactiveMembers,

    admins

  };

}
