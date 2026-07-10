import { Link } from "react-router-dom";


export default function AdminLayout({
children,
}:{
children:React.ReactNode;
}){


return(

<div className="min-h-screen flex">


<aside
className="
w-64
bg-blue-700
text-white
p-5
"
>


<h2
className="
text-xl
font-bold
mb-6
"
>
DPA Portal
</h2>


<nav
className="
space-y-3
"
>

<Link
to="/dashboard"
className="block"
>
Dashboard
</Link>


<Link
to="/members"
className="block"
>
Members
</Link>


<Link
to="/fund"
className="block"
>
Fund
</Link>


<Link
to="/bank"
className="block"
>
Bank
</Link>


<Link
to="/reports"
className="block"
>
Reports
</Link>


</nav>


</aside>



<main
className="
flex-1
p-6
"
>


{children}


</main>


</div>

);

}
