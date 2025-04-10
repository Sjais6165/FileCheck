
//-----------------------------


// import express from "express";
// import path from "path";
// import fs from "fs";
// import File from "../models/file.js"; // Adjust the path based on your structure
// import { authenticateUser } from "../middleware/auth.js"; // Import your auth middleware

// const router = express.Router();

// // ✅ Protected route for downloading file
// router.get("/download/:fileId", authenticateUser, async (req, res) => {
//     try {
//         const file = await File.findById(req.params.fileId);
//         if (!file) return res.status(404).json({ error: "File not found" });

//         const filePath = path.resolve(file.path); // Ensure path is absolute
//         if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File missing from server" });

//         res.download(filePath, file.originalname); // You can specify original file name
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error while downloading file" });
//     }
// });

// export default router;

//----------------------

import express from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import File from "../models/file.js"; // Adjust the path based on your structure

dotenv.config();

const router = express.Router();

// ✅ Authentication Middleware
export const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

// ✅ Protected route for downloading file
router.get("/download/:fileId", authenticateUser, async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ error: "File not found" });

        const filePath = path.resolve(file.path); // Ensure path is absolute
        if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File missing from server" });

        res.download(filePath, file.originalname); // You can specify original file name
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error while downloading file" });
    }
});

export default router;

