import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env['ASIAZWA4ZUMKYEHJTQRT'],
        secretAccessKey: process.env['h7gBWjzBKxUO3hx7v1mrE0io2kjTitGM8RtVf8yH'],
    },
    region: process.env['us-east-1']
})


const s3Storage = multerS3({
    s3: s3,
    bucket: process.env['BUCKET_NAME'], 
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});

// our middleware
const uploadImage = multer({
    storage: s3Storage,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
})

export default uploadImage;