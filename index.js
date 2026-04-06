import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

const app = express()

const mongoDBURI=process.env.MONGO_URI



mongoose.connect(mongoDBURI).then(
   ()=> {
        console.log("Connected to mongoDB")
    }
)

app.use(cors())

app.use(express.json())

app.use(authenticateUser)

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)


app.listen(3000,()=>{ 
    console.log("Server is running on port 3000")
});
