import {
useEffect,
useState
}
from "react";


import AppLayout 
from "@/layouts/AppLayout";


import {
getDashboardStats
}
from "@/services/dashboardService";


import StatCard
from "@/components/dashboard/StatCard";



export default function DashboardPage(){


const [stats,setStats]=
useState<any>(null);



useEffect(()=>{


async function load(){

const data =
await getDashboardStats();


setStats(data);


}


load();


},[]);



return(

<AppLayout>


<h1>
Dashboard
</h1>


{
stats &&

<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(4,1fr)",

gap:"20px"

}}

>


<StatCard

title="Total Members"

value={
stats.totalMembers
}

/>


<StatCard

title="Active Members"

value={
stats.activeMembers
}

/>


<StatCard

title="Inactive Members"

value={
stats.inactiveMembers
}

/>


<StatCard

title="Admins"

value={
stats.admins
}

/>


</div>

}


</AppLayout>

);


}
