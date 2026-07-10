import { supabase } from "@/lib/supabase";


export async function uploadMemberPhoto(
 file:File
){

if(
!file.type.startsWith("image/")
){

throw new Error(
"Only image files allowed"
);

}



if(
file.size > 2 * 1024 * 1024
){

throw new Error(
"Maximum 2MB allowed"
);

}



const extension =
file.name.split(".").pop();



const fileName =
`members/${Date.now()}.${extension}`;



const {error}=await supabase
.storage
.from("member-photos")
.upload(
fileName,
file,
{
cacheControl:"3600",
upsert:false
}
);



if(error){

throw error;

}



const {data}=supabase
.storage
.from("member-photos")
.getPublicUrl(
fileName
);



return data.publicUrl;


}
