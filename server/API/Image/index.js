import express from "express";
import multer from "multer";

import {s3Upload} from "../../Utils/AWS/s3";

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({storage});

/*
    Route           /
    Descrip         Uploading given image to s3 bucket, then saving it to mongodb
    Params          None
    Access          Public
    Method          POST
*/

Router.post("/", upload.single("file"), async(req, res) => {
    try {  
        const file = req.file;
        
        //S3 bucket options
        const bucketOptions = {
            Bucket: "electricwaala",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype
        };  

        const uploadImage = await s3Upload(bucketOptions);
        return res.status(200).json({ uploadImage });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;