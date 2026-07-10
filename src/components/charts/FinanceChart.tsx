import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
}
from "recharts";


interface Props{
income:number;
expense:number;
}


export default function FinanceChart({
income,
expense
}:Props){


const data=[

{
name:"Income",
value:income
},

{
name:"Expense",
value:expense
}

];


return(

<div
style={{
height:300
}}
>

<ResponsiveContainer>

<PieChart>


<Pie

data={data}

dataKey="value"

outerRadius={100}

label

>


{
data.map(
(item,index)=>(

<Cell
key={index}
/>

)
)
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>


);


}
