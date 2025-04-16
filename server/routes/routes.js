
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


