import  Express  from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectroute from "../middleware/protectroute.js";

const routes = Express.Router()
routes.post("/send/:id",protectroute,sendMessage)
routes.get("/:id",protectroute,getMessages)
export default routes