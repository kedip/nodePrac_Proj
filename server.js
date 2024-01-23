import express from "express";
import { connectToDatabase } from "./src/helpers/db";
import route from "./src/routes";
import dotenv from "dotenv";
dotenv.config();

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import YAML from "yamljs";

connectToDatabase();
const app = express();


const specs = swaggerJsDoc(YAML.load('./studentForm.yml'));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: true }));


app.use(route);

const port = process.env.port || 4200
app.listen(port,()=>{
    console.log(`concted ${port}`);
});





