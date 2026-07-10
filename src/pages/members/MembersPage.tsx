import { useEffect, useState } from "react";
import { Search, Plus, User, Trash2, X, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Member {
  id: string;
  member_id: string;
  full_name: string;
  mobile: string;
  studio_name: string;
  photo_url?: string;
  status: "Active" | "Pending";
}

export default function MembersPage() {

  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    father_name: "",
    mobile: "",
    aadhaar: "",
    studio_name: "",
    address: "",
  });


  useEffect(() => {
    loadMembers();
  }, []);



  async function loadMembers() {

    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", {
        ascending: false
      });


    if(error){

      toast.error(error.message);

    }else{

      setMembers(data || []);

    }

    setLoading(false);

  }



  function generateMemberId(){

    const year = new Date().getFullYear();

    const number =
      Math.floor(
        1000 + Math.random() * 9000
      );

    return `DPA-${year}-${number}`;

  }



  async function uploadPhoto(){

    if(!photo)
      return "";


    const fileName =
      `${Date.now()}-${photo.name}`;


    const {error} =
      await supabase.storage
      .from("member-photos")
      .upload(
        fileName,
        photo
      );


    if(error){

      toast.error(error.message);
      return "";

    }


    const {data} =
      supabase.storage
      .from("member-photos")
      .getPublicUrl(fileName);


    return data.publicUrl;

  }





  async function addMember(){

    if(
      !formData.full_name ||
      !formData.mobile
    ){

      toast.error(
        "Name and Mobile required"
      );

      return;

    }


    const photoUrl =
      await uploadPhoto();



    const {error}=await supabase
    .from("members")
    .insert({

      member_id:
      generateMemberId(),

      full_name:
      formData.full_name,

      father_name:
      formData.father_name,

      mobile:
      formData.mobile,

      aadhaar:
      formData.aadhaar,

      studio_name:
      formData.studio_name,

      address:
      formData.address,

      photo_url:
      photoUrl,

      status:
      "Active"

    });



    if(error){

      toast.error(error.message);

    }else{

      toast.success(
        "Member Added Successfully"
      );

      setShowForm(false);

      setPhoto(null);

      setFormData({

        full_name:"",
        father_name:"",
        mobile:"",
        aadhaar:"",
        studio_name:"",
        address:""

      });

      loadMembers();

    }

  }





  async function deleteMember(id:string){

    if(!confirm("Delete Member?"))
      return;


    const {error}=await supabase
    .from("members")
    .delete()
    .eq("id",id);


    if(error){

      toast.error(error.message);

    }else{

      toast.success(
        "Member Deleted"
      );

      loadMembers();

    }

  }





  const filteredMembers =
    members.filter((member)=>

      member.full_name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

      ||

      member.member_id
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

      ||

      member.mobile.includes(search)

    );





return (

<div className="p-6 space-y-6">


<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold">
Members
</h1>

<p className="text-gray-500">
Dammapeta Photographers Association
</p>

</div>


<button

onClick={()=>setShowForm(true)}

className="
bg-blue-600
text-white
px-4 py-2
rounded-lg
flex gap-2
items-center
">

<Plus size={18}/>

Add Member

</button>


</div>





<div className="relative">


<Search
className="absolute left-3 top-3 text-gray-400"
size={18}
/>


<input

className="
w-full border rounded-lg
py-3 pl-10
"

placeholder="
Search Name / Member ID / Mobile
"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</div>





<div className="
bg-white shadow rounded-xl overflow-hidden
">


<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-4">
Photo
</th>

<th className="p-4">
Member ID
</th>

<th className="p-4">
Name
</th>

<th className="p-4">
Mobile
</th>

<th className="p-4">
Studio
</th>

<th className="p-4">
Action
</th>

</tr>

</thead>



<tbody>


{
loading ?

<tr>
<td
colSpan={6}
className="text-center p-10"
>
Loading...
</td>
</tr>


:

filteredMembers.length===0 ?


<tr>

<td
colSpan={6}
className="text-center p-10 text-gray-500"
>

<User
className="mx-auto"
size={40}
/>

No Members

</td>

</tr>


:


filteredMembers.map(member=>(


<tr
key={member.id}
className="border-t"
>


<td className="p-4">

{

member.photo_url ?

<img
src={member.photo_url}
className="
w-12 h-12 rounded-full object-cover
"
/>

:

<User/>

}

</td>


<td>{member.member_id}</td>

<td>{member.full_name}</td>

<td>{member.mobile}</td>

<td>{member.studio_name}</td>


<td>

<button

onClick={()=>
deleteMember(member.id)
}

className="text-red-600"
>

<Trash2 size={18}/>

</button>

</td>


</tr>


))


}


</tbody>


</table>


</div>





{
showForm &&

<div className="
fixed inset-0
bg-black/50
flex items-center justify-center
">


<div className="
bg-white
p-6
rounded-xl
w-full max-w-lg
space-y-3
">


<div className="flex justify-between">

<h2 className="text-xl font-bold">
Add Member
</h2>


<button
onClick={()=>setShowForm(false)}
>

<X/>

</button>


</div>



<input
className="input"
placeholder="Full Name"

onChange={(e)=>
setFormData({
...formData,
full_name:e.target.value
})
}

/>


<input
className="input"
placeholder="Father Name"

onChange={(e)=>
setFormData({
...formData,
father_name:e.target.value
})
}

/>


<input
className="input"
placeholder="Mobile"

onChange={(e)=>
setFormData({
...formData,
mobile:e.target.value
})
}

/>


<input
className="input"
placeholder="Aadhaar"

onChange={(e)=>
setFormData({
...formData,
aadhaar:e.target.value
})
}

/>


<input
className="input"
placeholder="Studio Name"

onChange={(e)=>
setFormData({
...formData,
studio_name:e.target.value
})
}

/>


<textarea

className="input"

placeholder="Address"

onChange={(e)=>
setFormData({
...formData,
address:e.target.value
})
}

/>



<div>

<label>
Photo Upload
</label>

<input

type="file"

accept="image/*"

onChange={(e)=>
setPhoto(
e.target.files?.[0] || null
)
}

/>

</div>




<button

onClick={addMember}

className="
bg-green-600
text-white
w-full
py-3
rounded-lg
flex
justify-center
gap-2
">

<Upload size={18}/>

Save Member

</button>


</div>


</div>

}


</div>

);

}
