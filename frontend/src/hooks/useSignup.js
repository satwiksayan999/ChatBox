import react, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/user_context";

const useSignup = () => {
     
    const [loading , setloading ]= useState(false);
    const {setAuthUser} = useAuthContext();

    const SignUp = async({fullname,username,password,confirmpassword,gender}) =>{

        const success=handleInputErrors({fullname,username,password,confirmpassword,gender});

        if(!success){
           return;
        }

        setloading(true);

        try{

            const res = await fetch("/api/auth/signup" , {
                method:"POST" ,
                headers:{"Content-Type" : "application/json"} ,
                body:JSON.stringify({fullname,username,password,confirmpassword,gender})
            });

            const data=await res.json();
            console.log(data);

            if(data.error){
                throw new Error(data.error);
            }

            //local storage
            //context

            localStorage.setItem("chat-user" , JSON.stringify(data));
            setAuthUser(data);

        }catch(error){

            toast.error(error.message);

        }finally{

            setloading(false);
        }

    }

    return {loading ,SignUp};
};

export default useSignup;

function handleInputErrors({fullname,username,password,confirmpassword,gender}){

    if(!fullname || !password || !confirmpassword || !gender || !username){
        toast.error("please fill in all fields");
        return false;
    }

    if(password !== confirmpassword){
        toast.error("Password do not match");
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be 6 characters long");
        return false;
    }

    return true;
};
