// import File from "../models/file.js";


// export const uploadImage = async (request, response) => {
//     const fileObj = {
//         path: request.file.path,
//         name: request.file.originalname
//     }

//     try {
//         const file = await File.create(fileObj);
//         console.log(file);
//         response.status(200).json({ path: `http://localhost:8000/file/${file._id}` })
//     } catch (error) {
//         console.error(error.message);
//         response.status(500).json({ error: error.message });
//     }
    
    
// };

// export const downloadImage = async (request, response) => {
//     try {
//        const file = await File.findById(request.params.fileId);
        
//         file.downloadCount++;

//         await file.save();

//         response.download(file.path, file.name);
//     } catch (error) {
//         console.error(error.message);
//         return response.status(500).json({ error: error.message });
        
//     }
// }


//---------------------------------

import File from "../models/file.js";
import dotenv from 'dotenv';

export const uploadImage = async (request, response) => {
    try {
        if (!request.file) {
            return response.status(400).json({ error: "No file uploaded" });
        }

        // Create file with expiration time set to 5 minutes
        const file = await File.create({
            path: request.file.path,
            name: request.file.originalname,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5-minute expiration
        });
        dotenv.config();
        const backerurl = process.env.BASE_URL
        console.log(file);
        response.status(200).json({ path: `{backerurl}/file/${file._id}` });

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);

        if (!file) {
            return response.status(404).json({ error: "File not found" });
        }

        // Check if file has expired
        if (file.expiresAt < new Date()) {
            return response.status(410).json({ error: "File link has expired" });
        }

        file.downloadCount++;
        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ error: error.message });
    }
};
