import User from "../models/user_model";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generate_token.js";

export const singup = async(req,res) => {

    console.log("signup user");

    try{

        const {fullname,username,password,confirmpassword , gender} = req.body;

        if(password!== confirmpassword){
            return res.status(400).json({error:"Passwords don't match "});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exist"});
        }

        //hash password her
        const salt= await bcrypt.genSalt(10);
        const hashed_password=await bcrypt.hash(password , salt );

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({fullname,username,password : hashed_password ,gender,profilepic: gender === "male" ? boyProfilePic : girlProfilePic });
       
        if(newUser){
            //generate token
            generatetokenandsetcookie(newUser._id , res);

            await newUser.save();

            res.status(201).json({ 
                _id:newUser._id ,
                fullname: newUser.fullname ,
                username: newUser.username ,
                profilepic: newUser.profilepic
            })

        }else{
            res.status(400).json({error:"Invalid user data"});
        }

    }catch(error){
        console.log("error is signup controller is " , error);
        res.status(500).json({error:"Internal Server error"});

    }

};

export const login = async(req,res) => {

    try{

        const{username , password} =req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password ,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generatetokenandsetcookie(user._id,res);

        res.status(200).json({
            _id:user._id ,
            fullname : user.fullname,
            username:user.username ,
            profilepic : user.profilepic 
        })

    }catch(error){
        console.log("error in login controller" ,error);
        res.status(500).json({error:"internal server error"});
    }

};

export const logout = async(req,res) => {

    try{

        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({message:"logged out successfully"});

    }catch(error){
        console.log("error in logout controller" ,error);
        res.status(500).json({error:"internal server error"});
    }

};