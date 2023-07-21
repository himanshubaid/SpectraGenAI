import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({path: "."});// allows us to pull our env variables from .env file
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


const app=express();
app.use(cors());
app.use(express.json({ limit :'50mb'}));
app.use('/api/v1/post',postRoutes);// created a api endpoints to hook from fontend side
app.use('/api/v1/dalle',dalleRoutes);



// Route path
app.get('/',async (req,res) => {
    res.send("Hello from DALL-E!");
})

const startServer =async ()=>{
    
    try{
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    }catch(error){

        console.log(error);
    }
    
}

startServer();