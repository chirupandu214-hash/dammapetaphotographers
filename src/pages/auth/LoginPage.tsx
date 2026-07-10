import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useNavigate} from "react-router-dom";


export default function LoginPage(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const navigate=useNavigate();



async function login(){


const {error}=await supabase.auth.signInWithPassword({

email,

password

});


if(!error){

navigate("/dashboard");

}


}




return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
">


<div className="
bg-white
p-6
rounded-xl
shadow
w-96
">


<h1 className="
text-2xl
font-bold
mb-5
">

Admin Login

</h1>


<input

className="input mb-3"

placeholder="Email"

onChange={(e)=>
setEmail(e.target.value)
}

/>


<input

className="input mb-3"

type="password"

placeholder="Password"

onChange={(e)=>
setPassword(e.target.value)
}

/>


<button

onClick={login}

className="
bg-blue-600
text-white
w-full
py-3
rounded-lg
">

Login

</button>


</div>


</div>

);

}
