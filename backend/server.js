import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-route.js";
import userRoutes from  "./routes/user-routes.js"

import connectDB from "./utils/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at ${PORT}`);
    })
})

