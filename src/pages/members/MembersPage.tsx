import { useEffect, useState } from "react";
import { Search, Plus, User, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Member {
  id: string;
  member_id: string;
  full_name: string;
  mobile: string;
  studio_name: string;
  status: "Active" | "Pending";
}

export default function MembersPage() {

  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

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
        ascending: false,
      });


    if (error) {

      toast.error(error.message);

    } else {

      setMembers(data || []);

    }

    setLoading(false);

  }



  function generateMemberId() {

    const year = new Date().getFullYear();

    const random =
      Math.floor(
        1000 + Math.random() * 9000
      );

    return `DPA-${year}-${random}`;

  }




  async function addMember() {


    if (
      !formData.full_name ||
      !formData.mobile
    ) {

      toast.error(
        "Name and Mobile required"
      );

      return;

    }



    const { error } = await supabase
      .from("members")
      .insert({

        member_id: generateMemberId(),

        full_name: formData.full_name,

        father_name: formData.father_name,

        mobile: formData.mobile,

        aadhaar: formData.aadhaar,

        studio_name: formData.studio_name,

        address: formData.address,

        status: "Active",

      });



    if (error) {

      toast.error(error.message);

    } else {

      toast.success(
        "Member Added Successfully"
      );


      setShowForm(false);


      setFormData({

        full_name: "",
        father_name: "",
        mobile: "",
        aadhaar: "",
        studio_name: "",
        address: "",

      });


      loadMembers();

    }

  }




  async function deleteMember(id:string){

    const confirmDelete =
      confirm(
        "Delete this member?"
      );


    if(!confirmDelete)
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


{/* Header */}

<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold">
Member Management
</h1>

<p className="text-gray-500">
Manage Association Members
</p>

</div>



<button

onClick={() =>
setShowForm(true)
}

className="
flex items-center gap-2
bg-blue-600
text-white
px-4 py-2
rounded-lg
">

<Plus size={18}/>

Add Member

</button>


</div>





{/* Search */}

<div className="relative">


<Search
className="
absolute left-3 top-3 text-gray-400
"
size={18}
/>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="
Search Name / Member ID / Mobile
"

className="
w-full border rounded-lg
py-3 pl-10
"

/>


</div>





{/* Table */}

<div className="
bg-white rounded-xl shadow overflow-hidden
">


<table className="w-full">


<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">
Member ID
</th>

<th className="p-4 text-left">
Name
</th>

<th className="p-4 text-left">
Mobile
</th>

<th className="p-4 text-left">
Studio
</th>

<th className="p-4 text-left">
Status
</th>

<th className="p-4">
Action
</th>

</tr>

</thead>



<tbody>


{
loading ? (

<tr>
<td
colSpan={6}
className="text-center py-10"
>
Loading...
</td>
</tr>

)

:

filteredMembers.length===0 ?


(

<tr>

<td
colSpan={6}
className="
text-center py-10 text-gray-500
">

<User
className="mx-auto mb-2"
size={40}
/>

No Members Found

</td>

</tr>


)

:


filteredMembers.map((member)=>(


<tr
key={member.id}
className="border-t"
>


<td className="p-4">
{member.member_id}
</td>


<td className="p-4">
{member.full_name}
</td>


<td className="p-4">
{member.mobile}
</td>


<td className="p-4">
{member.studio_name}
</td>


<td className="p-4">

<span className="
bg-green-100
text-green-700
px-3 py-1 rounded-full
">

{member.status}

</span>

</td>


<td className="p-4 text-center">

<button

onClick={() =>
deleteMember(member.id)
}

className="
text-red-600
flex items-center gap-1 mx-auto
">

<Trash2 size={16}/>

Delete

</button>


</td>


</tr>


))


}


</tbody>


</table>


</div>





{/* Add Member Modal */}


{
showForm && (


<div className="
fixed inset-0
bg-black/50
flex items-center justify-center
z-50
">


<div className="
bg-white
w-full max-w-lg
rounded-xl
p-6 space-y-4
">


<div className="
flex justify-between
">


<h2 className="text-xl font-bold">
Add New Member
</h2>


<button
onClick={() =>
setShowForm(false)
}
>

<X/>

</button>


</div>



<input
className="w-full border p-3 rounded-lg"
placeholder="Full Name"

value={formData.full_name}

onChange={(e)=>
setFormData({
...formData,
full_name:e.target.value
})
}
/>



<input
className="w-full border p-3 rounded-lg"
placeholder="Father Name"

value={formData.father_name}

onChange={(e)=>
setFormData({
...formData,
father_name:e.target.value
})
}
/>



<input
className="w-full border p-3 rounded-lg"
placeholder="Mobile"

value={formData.mobile}

onChange={(e)=>
setFormData({
...formData,
mobile:e.target.value
})
}
/>



<input
className="w-full border p-3 rounded-lg"
placeholder="Aadhaar"

value={formData.aadhaar}

onChange={(e)=>
setFormData({
...formData,
aadhaar:e.target.value
})
}
/>



<input
className="w-full border p-3 rounded-lg"
placeholder="Studio Name"

value={formData.studio_name}

onChange={(e)=>
setFormData({
...formData,
studio_name:e.target.value
})
}
/>



<textarea

className="w-full border p-3 rounded-lg"

placeholder="Address"

value={formData.address}

onChange={(e)=>
setFormData({
...formData,
address:e.target.value
})
}

/>



<button

onClick={addMember}

className="
bg-green-600
text-white
w-full
py-3
rounded-lg
">

Save Member

</button>



</div>


</div>


)

}


</div>

  );

}
