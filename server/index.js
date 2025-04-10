import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DBConnection from './database/db.js';
import authRoutes from './routes/auth.js';  // Authentication Routes Import
import router from './routes/routes.js';   // Other Rconsole.log("JWT_SECRET:", process.env.JWT_SECRET);outes Import

import uploadRoute from './routes/upload.js';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Body parser for JSON requests

// ✅ Serve uploads folder statically
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", authRoutes);  // API routes for authentication
app.use("/", router);         // Other app routes
app.use("/api", uploadRoute);


const PORT = process.env.PORT || 5000;

// Database Connection
DBConnection();

// Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on PORT ${PORT}`));
