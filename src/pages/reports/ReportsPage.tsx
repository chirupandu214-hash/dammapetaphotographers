import {
exportPDF
}
from "@/services/exportService";
import {
useEffect,
useState
}
from "react";


import AppLayout
from "@/layouts/AppLayout";


import {
getMemberReport,
getFundReport,
getBankReport
}
from "@/services/reportService";



export default function ReportsPage(){


const [members,setMembers]=
useState<any[]>([]);


const [funds,setFunds]=
useState<any[]>([]);


const [banks,setBanks]=
useState<any[]>([]);

function downloadReportPDF(){

const rows =
funds.map(
(item)=>[

item.receipt_no,

item.member_name,

item.amount,

item.year

]
);

<button

onClick={
downloadReportPDF
}

>
Download PDF
</button>
exportPDF(

"Fund Collection Report",

[
"Receipt",
"Member",
"Amount",
"Year"
],

rows,

"Fund_Report"

);

}

useEffect(()=>{


async function load(){


setMembers(
 await getMemberReport()
);


setFunds(
 await getFundReport()
);


setBanks(
 await getBankReport()
);


}


load();


},[]);



const totalFund =
funds.reduce(
(sum,item)=>
sum + Number(item.amount),
0
);



const income =
banks
.filter(
(x)=>x.type==="Income"
)
.reduce(
(sum,item)=>
sum+Number(item.amount),
0
);



const expense =
banks
.filter(
(x)=>x.type==="Expense"
)
.reduce(
(sum,item)=>
sum+Number(item.amount),
0
);



return(

<AppLayout>


<h1>
Reports
</h1>


<div>


<h3>
Members:
{members.length}
</h3>


<h3>
Total Fund:
₹ {totalFund}
</h3>


<h3>
Income:
₹ {income}
</h3>


<h3>
Expense:
₹ {expense}
</h3>


<h3>
Balance:
₹ {income-expense}
</h3>


</div>



<hr/>


<h2>
Fund Report
</h2>
<button

onClick={()=>
window.print()
}

>
Print
</button>

<table
style={{
width:"100%"
}}
>


<thead>

<tr>

<th>
Receipt
</th>

<th>
Member
</th>

<th>
Amount
</th>

<th>
Year
</th>


</tr>

</thead>



<tbody>

{
funds.map(
(item)=>(

<tr key={item.id}>

<td>
{item.receipt_no}
</td>


<td>
{item.member_name}
</td>


<td>
₹ {item.amount}
</td>


<td>
{item.year}
</td>


</tr>

)
)

}


</tbody>


</table>


</AppLayout>

);

}
