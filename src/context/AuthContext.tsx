import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";


interface AuthContextType {

  user:any;

  role:string | null;

  loading:boolean;

  signOut:()=>void;

}


const AuthContext =
createContext<AuthContextType | null>(null);



export function AuthProvider({
children
}:{
children:React.ReactNode
}){


const [user,setUser]=useState<any>(null);

const [role,setRole]=useState<string|null>(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


checkUser();


const {
data:{subscription}
}=supabase.auth.onAuthStateChange(
(_event,session)=>{

setUser(
session?.user ?? null
);

if(session?.user){

getRole(
session.user.id
);

}else{

setRole(null);

}

}
);


return ()=>{

subscription.unsubscribe();

};


},[]);





async function checkUser(){

const {
data
}=await supabase.auth.getSession();


const session=data.session;


setUser(
session?.user ?? null
);



if(session?.user){

getRole(
session.user.id
);

}


setLoading(false);

}





async function getRole(id:string){


const {data}=await supabase

.from("profiles")

.select("role")

.eq("id",id)

.single();


setRole(
data?.role || "member"
);


}




async function signOut(){

await supabase.auth.signOut();

setUser(null);

setRole(null);

}





return (

<AuthContext.Provider

value={{

user,

role,

loading,

signOut

}}

>


{children}


</AuthContext.Provider>


);


}





export function useAuth(){

const context =
useContext(AuthContext);


if(!context){

throw new Error(
"AuthProvider missing"
);

}


return context;


}
