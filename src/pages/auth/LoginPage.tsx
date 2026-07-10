import React from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage(){

 const navigate = useNavigate();


 return (
  <div style={{padding:40}}>

   <h1>
    Dammapeta Photographers Portal
   </h1>

   <button 
    onClick={()=>navigate("/dashboard")}
   >
    Login
   </button>

  </div>
 );

}
