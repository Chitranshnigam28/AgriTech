require('dotenv').config();
const express=require('express');
const cors=require('cors');
const signupRouter=require('./src/routes/signup');
const loginRouter=require('./src/routes/login');
const userRouter=require('./src/routes/user');
const app=express();
const PORT=process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api',signupRouter);
app.use('/api',loginRouter);
app.use('/api',userRouter);
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