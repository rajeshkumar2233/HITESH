



import mongoose  from "mongoose";
 import { DB_NAME } from "../constants.js";
 //import connectDB from "./db/index.js"





 const connectDB = async () => {
    try {
      const connecttionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
      console.log(`MongoDB connected : ${connecttionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB conection error ",error)
        process.exit(1)
    }
 }

  export default connectDB;