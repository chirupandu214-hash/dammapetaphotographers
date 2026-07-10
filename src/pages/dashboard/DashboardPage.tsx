import React from "react";

import {
useAuth
}
from "@/hooks/useAuth";


export default function DashboardPage(){


const {
profile
}=useAuth();



return(

<div>


<h1>
Dashboard
</h1>


<h2>
Welcome {profile?.name}
</h2>


<p>
Role : {profile?.role}
</p>



</div>

);


}
