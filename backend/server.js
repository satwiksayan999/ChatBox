import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";
import connection from "./db/connection.js";


const app=express();
dotenv.config();

const PORT= process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);


app.get("/" , (req,res)=>{
    
    // root route http://localhost:5000/

    res.send("hello world");
})


app.listen(PORT, ()=> { 

    connection();
    console.log(`server is running on server ${PORT}`) 

});