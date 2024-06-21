import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/user.js";  

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT ;
const URL = process.env.MONGO_URL;

mongoose.connect(URL).then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch(error => console.log(err));

app.use("/api",route);