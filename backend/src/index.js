// require("dotenv").config(
    
// )

import dotenv from "dotenv"


// import mongoose, { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";

dotenv.config({
    path: ".env"
})
 
connectDB()













/*

import express from "express";
const app = express()
; (async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("DB connected")
        app.on("error", (error) =>{
            console.log("ERROR:",error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    } catch(error){
        console.log("ERROR:",error)
        throw err
    }
})

*/