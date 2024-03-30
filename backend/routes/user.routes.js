import Express from "express";
import protectroute from "../middleware/protectroute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
const routes = Express.Router()
routes.get("/",protectroute,getUsersForSidebar)
export default routes