import {
Navigate
}
from "react-router-dom";


import {
useAuth
}
from "@/context/AuthContext";



export default function AdminRoute({
children
}:{
children:React.ReactNode
}){


const {user}=useAuth();



if(!user){

return <Navigate to="/login"/>;

}



if(user.role!=="Admin"){

return <Navigate to="/dashboard"/>;

}



return children;


}
