import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

// const URI = "mongodb://127.0.0.1:27017/chatApp";

const connectDB = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connect to database");
    } catch (error) {
        console.log("Errror connecting to database",error.message);
        
    }
}

export default connectDB;