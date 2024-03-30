import Express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDB } from "../DB/connectDB.js"
import cors from 'cors'
import { app, server } from "./socket/socket.js"
// const app = Express()
app.use(Express.json())
app.use(cookieParser())
dotenv.config()

const port = process.env.PORT || 5000
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials:true
  }));

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)



app.get("/", (req, res) => {
    res.send("hello world thsi si sowoer")

})

  server.listen(port, () => {
connectDB()
    console.log("server is running at the port ", port)
})