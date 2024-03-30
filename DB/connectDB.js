import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("connected to mongodb")

    }
    catch(e){
        console.log("error while connecting db",e)

    }

}