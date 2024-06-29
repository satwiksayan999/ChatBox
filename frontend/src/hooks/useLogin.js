import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/user_context";

const useLogin = () =>{

    const[loading, setloading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login= async(username,password) => {

        const success=handleInputErrors({username , password });

        if(!success){
           return;
        }

        setloading(true);


        try{

            const res= await fetch("/api/auth/login" , {
                method:"POST" ,
                headers : {"Content-Type" : "application/json"} ,
                body: JSON.stringify({username , password})
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user" , JSON.stringify(data));
            setAuthUser(data);

        }catch(error){
    
        toast.error(error.message);

        }finally{
            setloading(false);
        }

    };

    return {loading , login};
};

export default useLogin;

function handleInputErrors({fullname,username,password,confirmpassword,gender}){

    if(!password ||  !username){
        toast.error("please fill in all fields");
        return false;
    }

    return true;
};