// import express from 'express';
// import { uploadImage, downloadImage } from '../controller/image-controller.js';
// import upload from '../utils/upload.js';

// const router = express.Router();

// router.post('/upload', upload.single('file'), uploadImage);
// router.get('/file/:fileId', downloadImage);

// export default router;

// --------------------------

import express from 'express';
import { uploadImage, downloadImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { authenticateUser } from '../middleware/auth.js'; // Import authentication middleware

const router = express.Router();

// Protected Upload route - Requires authentication & sets expiration time (5 minutes)
router.post('/upload', authenticateUser, upload.single('file'), uploadImage);

// Protected Download route - Requires authentication & prevents access after expiration
router.get('/file/:fileId', authenticateUser, downloadImage);

export default router;

