import  express  from "express";
import { getUser, createUser, deletUser } from "../controllers/userController";


const route = express.Router();


route.get("/getUsers",getUser)
route.post("/createUsers",createUser)
route.post("/deletUser/:userId",deletUser)




export default route;