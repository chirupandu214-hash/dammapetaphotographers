import MemberChart
from "@/components/charts/MemberChart";


import FundChart
from "@/components/charts/FundChart";


import FinanceChart
from "@/components/charts/FinanceChart";
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

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-5
",

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
  <div
className="
grid
grid-cols-1
lg:grid-cols-3
gap-5
mt-8
"
>


<div className="bg-white p-5 rounded-xl shadow">

<h2>
Members Growth
</h2>

<MemberChart
data={memberData}
/>

</div>



<div className="bg-white p-5 rounded-xl shadow">

<h2>
Fund Collection
</h2>

<FundChart
data={fundData}
/>

</div>



<div className="bg-white p-5 rounded-xl shadow">

<h2>
Finance
</h2>


<FinanceChart

income={70000}

expense={25000}

/>


</div>


</div>

}


</AppLayout>

);


}
