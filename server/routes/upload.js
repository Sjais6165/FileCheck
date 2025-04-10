import express from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import File from "../models/file.js";
import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();

// Storage config for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${uuid()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// ✅ Upload route (POST /upload)
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const file = new File({
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            // originalname: req.file.originalname,
             expiresAt: new Date(Date.now() + 3 * 60 * 1000)
        });

        await file.save();

        const fileDownloadUrl = `${process.env.BASE_URL}/api/files/download/${file._id.toString()}`;

        console.log("✅ Upload successful! File URL:", fileDownloadUrl);
        return res.status(200).json({ path: fileDownloadUrl });
    } catch (error) {
        console.error("❌ Upload error:", error);
        return res.status(500).json({ error: "File upload failed", details: error.message });
    }
});

// ✅ Download route (GET /files/download/:id)
router.get("/files/download/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid file ID format" });
        }

        const file = await File.findById(id);
        if (!file) return res.status(404).json({ error: "File not found in database" });

        const filePath = path.resolve(file.path);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found on server" });
        }

        // Check for expiry
        if (file.expiresAt && file.expiresAt < new Date()) {
            return res.status(410).send('Link expired.');
        }

        console.log('Before downloadCount:', file.downloadCount);

        // Increase download count
        file.downloadCount += 1;
        await file.save();

        // Log updated count
        console.log('After downloadCount:', file.downloadCount);
        
        res.download(file.path, file.originalname); // triggers file download
    } catch (err) {
        console.error("❌ Download error:", err.message);
        res.status(500).json({ error: "Something went wrong while downloading" });
    }
});

export default router;
