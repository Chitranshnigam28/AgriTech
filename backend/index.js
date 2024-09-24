require('dotenv').config();

const express=require('express');
const cors = require("cors");

const app=express();

app.get('/',(req,res)=>{
    res.send('Welcome to AgriTech Server');
})

const startServer=async ()=>{
    try{
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on Port ${process.env.PORT}`);
        })
    }catch(err){

    }
}

startServer();