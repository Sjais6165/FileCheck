// import express from 'express';
// import { uploadImage, downloadImage } from '../controller/image-controller.js';
// import upload from '../utils/upload.js';

// const router = express.Router();

// router.post('/upload', upload.single('file'), uploadImage);
// router.get('/file/:fileId', downloadImage);

// export default router;

// --------------------------

// import express from 'express';
// import { uploadImage, downloadImage } from '../controller/image-controller.js';
// import upload from '../utils/upload.js';
// import { authenticateUser } from '../middleware/auth.js'; // Import authentication middleware

// const router = express.Router();

// // Protected Upload route - Requires authentication & sets expiration time (5 minutes)
// router.post('/upload', authenticateUser, upload.single('file'), uploadImage);

// // Protected Download route - Requires authentication & prevents access after expiration
// router.get('/file/:fileId', authenticateUser, downloadImage);

// export default router;


//---------------------------
import express from "express";
import path from "path";
import File from "../models/file.js"; // adjust this path as per your project
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// 🔒 Protected route for downloading file
router.get("/download/:fileId", authenticateUser, async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }

        const filePath = path.resolve(file.path);
        res.download(filePath, file.originalname); // You can pass custom filename
    } catch (err) {
        console.error("Error while downloading file:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;


