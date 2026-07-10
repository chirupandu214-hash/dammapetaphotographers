import React,
{
createContext,
useContext,
useEffect,
useState
}
from "react";


import {supabase} from "@/lib/supabase";


const AuthContext=createContext<any>(null);


export function AuthProvider(
{
children
}:{
children:React.ReactNode
}){


const [user,setUser]=useState<any>(null);
const [profile,setProfile]=useState<any>(null);


useEffect(()=>{


supabase.auth.getSession()
.then(({data})=>{

setUser(data.session?.user || null);

});


const {
data:listener
}=supabase.auth.onAuthStateChange(
(_event,session)=>{

setUser(session?.user || null);

}
);


return ()=>{
listener.subscription.unsubscribe();
};


},[]);



useEffect(()=>{

if(user){

supabase
.from("profiles")
.select("*")
.eq("id",user.id)
.single()
.then(({data})=>{

setProfile(data);

});


}

},[user]);



return(

<AuthContext.Provider
value={{
user,
profile
}}
>

{children}

</AuthContext.Provider>

);

}



export function useAuth(){

return useContext(AuthContext);

}
