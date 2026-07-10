import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  QrCode,
  IdCard,
  BarChart3,
  CalendarDays,
  Bell,
  FileText,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";


const menuItems = [

  {
    name:"Dashboard",
    path:"/dashboard",
    icon:LayoutDashboard
  },

  {
    name:"Members",
    path:"/members",
    icon:Users
  },

  {
    name:"Payments",
    path:"/payments",
    icon:CreditCard
  },

  {
    name:"Bank",
    path:"/bank",
    icon:Building2
  },

  {
    name:"QR Verification",
    path:"/qr",
    icon:QrCode
  },

  {
    name:"ID Cards",
    path:"/idcards",
    icon:IdCard
  },

  {
    name:"Reports",
    path:"/reports",
    icon:BarChart3
  },

  {
    name:"Events",
    path:"/events",
    icon:CalendarDays
  },

  {
    name:"Notifications",
    path:"/notifications",
    icon:Bell
  },

  {
    name:"Documents",
    path:"/documents",
    icon:FileText
  },

  {
    name:"Users",
    path:"/users",
    icon:ShieldCheck
  },

  {
    name:"Settings",
    path:"/settings",
    icon:Settings
  }

];



export function AppLayout(){

const location = useLocation();

const [mobileMenu,setMobileMenu]=useState(false);



return (

<div className="min-h-screen bg-gray-100 flex">



{/* Sidebar */}


<aside

className={`
fixed md:static
top-0 left-0
h-screen
w-64
bg-white
shadow-lg
z-40
transition-transform

${
mobileMenu
?
"translate-x-0"
:
"-translate-x-full md:translate-x-0"
}

`}

>



<div className="
p-5
border-b
">


<h1 className="
text-xl
font-bold
text-blue-600
">

Dammapeta

</h1>


<p className="text-sm text-gray-500">

Photographers Portal

</p>


</div>





<nav className="
p-4
space-y-2
overflow-y-auto
h-[calc(100vh-120px)]
">


{

menuItems.map((item)=>{


const Icon=item.icon;


const active =
location.pathname===item.path;



return (

<Link

key={item.path}

to={item.path}

onClick={()=>
setMobileMenu(false)
}

className={`

flex
items-center
gap-3
px-4
py-3
rounded-lg

${
active

?

"bg-blue-600 text-white"

:

"text-gray-700 hover:bg-gray-100"

}

`}

>


<Icon size={20}/>


<span>
{item.name}
</span>


</Link>


);


})


}



</nav>





<div className="
absolute
bottom-0
w-full
p-4
border-t
">


<button

className="
flex
items-center
gap-3
text-red-600
"

>

<LogOut size={20}/>

Logout

</button>


</div>



</aside>







{/* Main Area */}


<div className="
flex-1
md:ml-0
">



<header

className="
bg-white
shadow
p-4
flex
items-center
gap-4
"

>


<button

className="
md:hidden
"

onClick={()=>
setMobileMenu(!mobileMenu)
}

>


{
mobileMenu
?
<X/>
:
<Menu/>
}


</button>




<div>


<h2 className="
font-bold
text-lg
">

Welcome Admin

</h2>


<p className="
text-sm
text-gray-500
">

Dammapeta Photographers Association

</p>


</div>


</header>





<main>

<Outlet/>

</main>



</div>




</div>

);

}
