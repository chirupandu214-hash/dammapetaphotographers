import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Phone,
  MessageCircle,
  Printer,
  ArrowLeft,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";


interface Member {

  id:string;
  member_id:string;
  full_name:string;
  father_name:string;
  mobile:string;
  aadhaar:string;
  studio_name:string;
  address:string;
  photo_url:string;
  status:string;

}



export default function MemberProfilePage(){

const {id}=useParams();

const [member,setMember]=
useState<Member | null>(null);


useEffect(()=>{

loadMember();

},[]);



async function loadMember(){

const {data,error}=await supabase
.from("members")
.select("*")
.eq("id",id)
.single();


if(!error){

setMember(data);

}

}




if(!member){

return (

<div className="p-6">

Loading Member...

</div>

);

}



return (

<div className="p-6 space-y-6">


<Link
to="/members"
className="
flex gap-2
items-center
text-blue-600
"
>

<ArrowLeft size={18}/>

Back

</Link>





<div className="
bg-white
rounded-xl
shadow
p-6
max-w-3xl
mx-auto
">


<div className="
flex
gap-6
items-center
">


{

member.photo_url &&

<img

src={member.photo_url}

className="
w-32
h-32
rounded-full
object-cover
border
"

/>

}




<div>


<h1 className="
text-3xl
font-bold
">

{member.full_name}

</h1>


<p>
Member ID:
<b>
{member.member_id}
</b>
</p>


<p>
Studio:
{member.studio_name}
</p>


<p>
Mobile:
{member.mobile}
</p>


</div>


</div>





<hr className="my-6"/>



<div className="
grid
md:grid-cols-2
gap-4
">


<div>

<p>
Father Name
</p>

<b>
{member.father_name}
</b>

</div>



<div>

<p>
Aadhaar
</p>

<b>
{member.aadhaar}
</b>

</div>



<div>

<p>
Address
</p>

<b>
{member.address}
</b>

</div>



<div>

<p>
Status
</p>

<b>
{member.status}
</b>

</div>


</div>





<div className="
mt-6
flex
gap-4
">


<a

href={`tel:${member.mobile}`}

className="
bg-green-600
text-white
px-4
py-2
rounded-lg
flex
gap-2
items-center
"

>

<Phone size={18}/>

Call

</a>



<a

href={`https://wa.me/91${member.mobile}`}

target="_blank"

className="
bg-green-500
text-white
px-4
py-2
rounded-lg
flex
gap-2
items-center
"

>

<MessageCircle size={18}/>

WhatsApp

</a>




<button

onClick={()=>
window.print()
}

className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
flex
gap-2
items-center
"

>

<Printer size={18}/>

Print

</button>



</div>





<div className="
mt-8
text-center
">


<h2 className="
font-bold
mb-3
">

Member QR Code

</h2>


<QRCodeCanvas

value={
JSON.stringify({

id:member.member_id,

name:member.full_name,

mobile:member.mobile

})
}

size={160}

/>


<p className="mt-2 text-sm">

Scan to Verify Member

</p>


</div>



</div>


</div>

);

}
