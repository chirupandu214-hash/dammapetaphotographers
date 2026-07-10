import { supabase } from "@/lib/supabase";


export async function uploadMemberPhoto(
  file: File
) {

  const fileExt =
    file.name.split(".").pop();


  const fileName =
    `${Date.now()}.${fileExt}`;


  const filePath =
    `members/${fileName}`;


  const { error } =
    await supabase
      .storage
      .from("member-photos")
      .upload(
        filePath,
        file
      );


  if (error) {
    throw error;
  }


  const { data } =
    supabase
      .storage
      .from("member-photos")
      .getPublicUrl(
        filePath
      );


  return data.publicUrl;
}
