import { useEffect, useState } from "react";

import {
  addMember,
  updateMember,
  getNextMemberId,
} from "@/services/memberService";

import {
  uploadMemberPhoto,
} from "@/services/storageService";


interface MemberFormData {

  id?: number;

  member_id: string;

  full_name: string;

  father_name: string;

  mobile: string;

  aadhaar: string;

  email: string;

  gender: string;

  dob: string;

  blood_group: string;

  studio_name: string;

  address: string;

  join_date: string;

  photo: string;

  role: string;

  status: string;

}



interface Props {

  editMode?: boolean;

  initialData?: MemberFormData;

  onSaved?:()=>void;

}



export default function MemberForm({

 editMode=false,

 initialData,

 onSaved,

}:Props){


const [loading,setLoading]=
useState(false);


const [photoFile,setPhotoFile]=
useState<File|null>(null);



const [form,setForm]=
useState<MemberFormData>({

member_id:"",

full_name:"",

father_name:"",

mobile:"",

aadhaar:"",

email:"",

gender:"Male",

dob:"",

blood_group:"",

studio_name:"",

address:"",

join_date:"",

photo:"",

role:"Member",

status:"Active",

});



useEffect(()=>{


async function load(){


if(editMode && initialData){

setForm(initialData);

return;

}



const id =
await getNextMemberId();


setForm(prev=>({

...prev,

member_id:id

}));


}


load();


},[editMode,initialData]);




function change(
e:React.ChangeEvent<HTMLInputElement>
){

setForm({

...form,

[e.target.name]:
e.target.value

});


}



function photoChange(
e:React.ChangeEvent<HTMLInputElement>
){

const file =
e.target.files?.[0];


if(file){

setPhotoFile(file);

}


}




async function submit(
e:React.FormEvent
){

e.preventDefault();


try{


setLoading(true);


let photo=form.photo;



if(photoFile){

photo =
await uploadMemberPhoto(
photoFile
);

}



const data={

...form,

photo

};



if(editMode && initialData?.id){


await updateMember(

initialData.id,

data

);


alert(
"Member Updated"
);


}

else{


await addMember(data);


alert(
"Member Added"
);


}




onSaved?.();


}

catch(error){


console.error(error);


alert(
"Save Failed"
);


}

finally{

setLoading(false);

}


}




return(

<form
onSubmit={submit}
>


<h2>
Member Form
</h2>


<input

name="member_id"

value={form.member_id}

readOnly

placeholder="Member ID"

/>



<input

name="full_name"

value={form.full_name}

onChange={change}

placeholder="Full Name"

/>



<input

name="father_name"

value={form.father_name}

onChange={change}

placeholder="Father Name"

/>



<input

name="mobile"

value={form.mobile}

onChange={change}

placeholder="Mobile"

/>



<input

name="aadhaar"

value={form.aadhaar}

onChange={change}

placeholder="Aadhaar"

/>



<input

name="studio_name"

value={form.studio_name}

onChange={change}

placeholder="Studio Name"

/>



<input

type="file"

accept="image/*"

onChange={photoChange}

/>



<button
disabled={loading}
>

{
loading
?
"Saving..."
:
editMode
?
"Update Member"
:
"Save Member"
}

</button>



</form>

);


}
