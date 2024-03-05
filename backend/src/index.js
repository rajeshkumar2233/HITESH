// require("dotenv").config(
    
// )

import dotenv from "dotenv"


// import mongoose, { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({
    path: ".env"
})
 
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongodb connection failed or ERROR:",err);
})












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