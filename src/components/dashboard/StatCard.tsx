interface Props{

 title:string;

 value:number;

}


export default function StatCard({
 title,
 value
}:Props){

return(

<div

style={{
padding:"20px",
background:"#fff",
borderRadius:"10px",
boxShadow:"0 3px 10px #ddd"
}}

>

<h3>
{title}
</h3>


<h1>
{value}
</h1>


</div>

);

}
