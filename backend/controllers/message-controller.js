import Conversation from "../models/conversation-model.js";
import Message from "../models/messages-model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
     try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all: [senderId,receiverId]},
        })
        if(!conversation){
            conversation =  await Conversation.create({
                participants: [senderId,receiverId],
            })
        }
        const newMessage = Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

         // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage);


     } catch (error) {
        console.log("Error in sendMessage Controller",error.message);
        res.status(500).json({error : "Internal server erroe"});
     }
}

export const getMessage =  async(req,res) =>{
    try {
        const{id:userTochatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants : {$all: [senderId,userTochatId]},
        }).populate("messages");
        if(!conversation){
            return res.status(200).json([]);
        }
        const message = conversation.messages
        res.status(200).send(message);
        
    } catch (error) {
        console.log("Error in getMessage Controller",error.message);
        res.status(500).json({error : "Internal server erroe"});
    }
}