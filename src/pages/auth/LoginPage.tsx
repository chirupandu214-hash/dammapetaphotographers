import React,
{
useState
}
from "react";


import {
supabase
}
from "@/lib/supabase";


import {
useNavigate
}
from "react-router-dom";



export default function LoginPage(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");

const navigate=useNavigate();



async function login(){


const {error}=await supabase.auth.signInWithPassword({

email,
password

});


if(error){

setError(error.message);

}
else{

navigate("/dashboard");

}


}



return(

<div className="login">


<h1>
Dammapeta Photographers Portal
</h1>


<input
placeholder="Email"
value={email}
onChange={
e=>setEmail(e.target.value)
}
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={
e=>setPassword(e.target.value)
}
/>


<button onClick={login}>
Login
</button>


<p>
{error}
</p>


</div>

);


}
