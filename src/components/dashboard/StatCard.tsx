export default function StatCard({
title,
value
}:Props){

return(

<div
className="
bg-white
rounded-xl
shadow
p-5
"
>

<h3 className="text-gray-600">
{title}
</h3>


<h1
className="
text-3xl
font-bold
mt-2
"
>
{value}
</h1>


</div>

);

}
