import express from 'express';
import * as dotenv from 'dotenv';// allow us to use environment variables
import {v2 as cloudinary } from 'cloudinary';//so that we can store it and retrive it when ever needed

import Post from  '../mongodb/models/post.js';

dotenv.config();

const router=express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get all post route from the frontend
router.route('/').get(async(req,res) => {
    try{
        const posts =await Post.find({});
        res.status(200).json({ success:true,data:posts})
    } catch(error){
        res.status(500).json({success:false, message:error})
    }
});


// create a post route uploading to the cloudinary database
router.route('/').post( async(req,res) => {

try{
    const {name,prompt,photo} =req.body;
    const photoUrl =await cloudinary.uploader.upload(photo);// storing the photo in the cloudinary

    const newPost = await Post.create({// string the database in the url
        name,
        prompt,
        photo:photoUrl.url,
    })

    res.status(201).json({ success:true, data:newPost });
}catch(error){
    res.status(500).json({ success:false,message:error})
}
});

export default router;
