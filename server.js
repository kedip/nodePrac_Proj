import express from "express";
import { connectToDatabase } from "./src/helpers/db";
import route from "./src/routes";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.port);

connectToDatabase();
const app = express();

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: true }));


app.use(route);
 app.get("/keyur",async (req, res)=>{
   await res.status(200).json({"Welcome to my World":"okDone"});
 });

 app.post("/jay", async (req, res)=>{
    const {Name} = req.body;
    // const name=req.body.Name

    await res.json(Name)
 })



const port = process.env.port || 4200
app.listen(port,()=>{
    console.log(`concted ${port}`);
});





