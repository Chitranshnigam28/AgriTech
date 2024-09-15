require('dotenv').config();
const express=require('express');

const app=express();
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Welcome to AgriTech Server');
})

const startServer=async ()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`)
        })
    }catch{

    }
}
startServer();