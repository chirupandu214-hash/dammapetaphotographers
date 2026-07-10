import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}
from "recharts";


interface Props{
data:any[];
}


export default function FundChart({
data
}:Props){

return(

<div
style={{
height:300
}}
>

<ResponsiveContainer>

<LineChart data={data}>


<XAxis dataKey="year"/>


<YAxis/>


<Tooltip/>


<Line
type="monotone"
dataKey="amount"
/>


</LineChart>


</ResponsiveContainer>


</div>

);

}
