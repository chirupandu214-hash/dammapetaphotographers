import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import {
 getMemberById
} from "@/services/memberService";

import MemberCard
from "@/components/members/MemberCard";


export default function MemberProfilePage(){

const {id}=useParams();

const [member,setMember]=useState<any>(null);


useEffect(()=>{

async function load(){

if(!id)return;

const data =
await getMemberById(
Number(id)
);

setMember(data);

}

load();

},[id]);


return(

<AppLayout>

<h1>
Member Profile
</h1>


{
member ?

<MemberCard member={member}/>

:

<p>
Loading...
</p>

}


</AppLayout>

);


}
