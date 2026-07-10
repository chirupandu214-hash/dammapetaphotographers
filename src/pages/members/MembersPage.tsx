import { useEffect, useState } from "react";
import { Search, Plus, User, Trash2 } from "lucide-react";
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

  const [search, setSearch] = useState("");

  const [members, setMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(true);


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



  async function deleteMember(id:string){

    const confirmDelete = confirm(
      "Delete this member?"
    );

    if(!confirmDelete) return;


    const {error}=await supabase
      .from("members")
      .delete()
      .eq("id",id);


    if(error){

      toast.error(error.message);

    }else{

      toast.success(
        "Member deleted"
      );

      loadMembers();

    }

  }



  const filteredMembers = members.filter(
    (member)=>

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
Manage association members
</p>

</div>


<button
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
absolute left-3 top-3
text-gray-400
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
w-full
border
rounded-lg
py-3
pl-10
"

/>


</div>





{/* Table */}

<div className="
bg-white
rounded-xl
shadow
overflow-hidden
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

<th className="p-4 text-center">
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
className="
text-center
py-10
">

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
text-center
py-10
text-gray-500
">


<User
className="mx-auto mb-3"
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


<span
className={`
px-3 py-1 rounded-full text-sm

${
member.status==="Active"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}
>

{member.status}

</span>


</td>



<td className="p-4 text-center">


<button
onClick={()=>
deleteMember(member.id)
}

className="
text-red-600
hover:underline
flex
items-center
gap-1
mx-auto
"
>

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


</div>

);

}
