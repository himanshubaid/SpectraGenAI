import express from 'express';
// import * as dotenv from 'dotenv';// allow us to use environment variables
import { Configuration, OpenAIApi} from 'openai'
import * as dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

const configuration=new Configuration({
    apikey: process.env.OPENAI_API_KEY,
})

const openai=new OpenAIApi(configuration);

router.route('/').get((req,res) => {
    res.send('message: Hello from SpectraGenAI');
});

router.route('/').post(async (req,res) => {

    try {
        const { prompt } = req.body;

        console.log(configuration.apiKey);
        console.log(process.env.OPENAI_API_KEY);

        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json',
        });

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({photo:image});// after getting the image we are sending to frontend
    } catch(error){
        console.log(error);
        res.status(500).send(error?.response.data.error.message)

    }
})

export default router;