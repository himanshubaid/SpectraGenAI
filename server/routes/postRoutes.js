import express from 'express';
import * as dotenv from 'dotenv';// allow us to use environment variables
import {v2 as cloudnary } from 'cloudinary';

import Post from  '../mongodb/models/post.js';

dotenv.config();

const router=express.Router();

export default router;
