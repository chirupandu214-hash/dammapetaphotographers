import {
createContext,
useContext,
useState
}
from "react";


const AuthContext =
createContext<any>(null);



export function AuthProvider({
children
}:{
children:React.ReactNode
}){


const [user,setUser]=
useState<any>(null);



function login(data:any){

setUser(data);

localStorage.setItem(
"user",
JSON.stringify(data)
);

}



function logout(){

setUser(null);

localStorage.removeItem(
"user"
);

}



return(

<AuthContext.Provider

value={{
user,
login,
logout
}}

>

{children}

</AuthContext.Provider>


);


}



export function useAuth(){

return useContext(
AuthContext
);

}
