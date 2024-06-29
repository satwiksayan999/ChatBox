import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendmessage = async(req,res) => {

    try{
        const {message}=req.body;
        const {id:receiverid}=req.params;
        const senderid = req.user._id;

        let conversation = await Conversation.findOne({participants: { $all : [senderid , receiverid ] }});

        if(!conversation){
           conversation = await Conversation.create({ participants :[senderid , receiverid] , });
        };

        const newMessage = new Message({ senderid , receiverid , message });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //await conversation.save();
        //await newMessage.save();

        await Promise.all([conversation.save() , newMessage.save()]);

        //socket io functionality
        const receiverSocketId = getReceiverSocketId(receiverid);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage" , newMessage);
        }

        res.status(201).json(newMessage);

    }catch(error){

        console.log("error in message controller" , error);
        req.status(500).json({error:"Internal server error"});
    }

};

export const getmessage = async(req,res) => {

    try{
      
        const{id: userToChatId} = req.params;
        const senderid = req.user._id;

        const conversation = await Conversation.findOne({ participants: { $all : [senderid , userToChatId ]}}).populate("messages");

        if(!conversation){
            return res.status(200).json([]);
        }
        
        const messages=conversation.messages;

        res.status(200).json(messages);

    }catch(error){
        console.log("error in getmessage controller" , error);
        res.status(500).json({error:"Internal server error"});
    }

};