import User from "../models/user.model.js"

export const getUsersForSidebar = async(req,res)=>{
try {

    const loggedinUserId = req.user._id

    const filteredusers = await User.find({_id:{$ne:loggedinUserId}})
    res.status(200).send(filteredusers)

    
} catch (error) {

    console.log("error in usercontroller getusersFromSidebar",error)

        res.status(500).send({"message":"internal server error"})
        
    
}
}