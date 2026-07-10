import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface Props {
  data:any[];
}


export default function MemberChart({
  data,
}:Props){

return(

<div
style={{
width:"100%",
height:300
}}
>

<ResponsiveContainer>

<BarChart data={data}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="count"
/>

</BarChart>

</ResponsiveContainer>


</div>

);

}
