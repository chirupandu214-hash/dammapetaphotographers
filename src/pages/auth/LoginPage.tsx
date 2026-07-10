import {
useState
}
from "react";


import {
loginUser
}
from "@/services/authService";


import {
useAuth
}
from "@/context/AuthContext";


import {
useNavigate
}
from "react-router-dom";



export default function LoginPage(){


const [mobile,setMobile]=
useState("");

const [password,setPassword]=
useState("");


const {
login
}=useAuth();


const navigate=
useNavigate();



async function submit(){


try{


const user=
await loginUser(
mobile,
password
);


login(user);


navigate(
"/dashboard"
);


}
catch{

alert(
"Invalid Login"
);

}



}



return(

<div>


<h1>
DPA Login
</h1>


<input

placeholder="Mobile"

onChange={
e=>setMobile(
e.target.value
)
}

/>


<input

type="password"

placeholder="Password"

onChange={
e=>setPassword(
e.target.value
)
}

/>


<button
onClick={submit}
>
Login
</button>



</div>

);


}
