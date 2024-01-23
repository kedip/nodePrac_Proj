import express from "express";
import { getUser, createUser, deletUser, updateUser, login } from "../controllers/userController";
import { verifyJwtAccessToken } from "../helpers/jwtHelper";

const route = express.Router();
const auth = express.Router();
auth.use(verifyJwtAccessToken)
route.use("/api", auth)

route.get("/getUsers", getUser)
route.post("/createUser", createUser)
route.post("/deletUser", deletUser)
// use params
// route.post("/deletUser/:userId",deletUser)
route.post("/api/updateUser", updateUser)
route.post("/login", login)






export default route;