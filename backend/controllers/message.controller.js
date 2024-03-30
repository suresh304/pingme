import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { getRecieverSocketId, io } from "../socket/socket.js"

export const sendMessage = async (req, res) => {
    try {
        
        const { message } = req.body
        const { id: recieverId } = req.params
        const  senderId  = req.user._id


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        conversation.messages.push(newMessage._id)

        await Promise.all([conversation.save(), newMessage.save()])

        const recieverSocketId = getRecieverSocketId(recieverId)

        if(recieverId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("error in sending messagecontroler")
        res.status(500).send({ "message": "internal server error" })
    }

}


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find conversation with specified participants
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');

        if (!conversation) {
            return res.status(200).json([]); // Send an empty array if conversation not found
        }

        const messages = conversation.messages;
        return res.status(200).json(messages); // Send the messages
    } catch (error) {
        console.error("Error in getMessages:", error);
        return res.status(500).json({ message: "Internal server error" }); // Send an error response
    }
};
