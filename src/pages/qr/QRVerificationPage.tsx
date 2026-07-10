import {
useEffect,
useState
}
from "react";

import {
useParams
}
from "react-router-dom";


import {
supabase
}
from "@/lib/supabase";


export default function QRVerificationPage(){

const {memberId}=useParams();

const [member,setMember]=useState<any>(null);


useEffect(()=>{


async function verify(){

const {data}=await supabase
.from("members")
.select("*")
.eq(
"member_id",
memberId
)
.single();


setMember(data);


}


verify();


},[memberId]);



return(

<div>

<h1>
Member Verification
</h1>


{
member ?

<div>

<h2>
{member.full_name}
</h2>

<p>
Member ID:
{member.member_id}
</p>


<p>
Status:
{member.status}
</p>


</div>

:

<p>
Invalid Member
</p>

}


</div>

);


}
