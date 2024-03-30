import  Express  from "express";
import { logOut, loginUser, signUp } from "../controllers/auth.controller.js";
const route = Express.Router()

route.post("/login",loginUser)
route.post("/signup",signUp)
route.get("/logout",logOut)
export default route