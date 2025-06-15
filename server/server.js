  
  /**
 * ==========================================
 * Woman Safety Web App — Express Server
 * ==========================================
 * 
 * This Express server provides RESTful APIs for:
 *  - User authentication and management (/api/user)
 *  - Emergency contact management (/api/contacts)
 *  - Review system (/api/reviews)
 *  - Profile operations (/api/profile)
 * 
 * Features:
 *  - Environment-based configuration using dotenv
 *  - CORS protection for local dev and production deployment
 *  - Cookie parsing for session or token handling
 *  - JSON + URL-encoded body parsing
 *  - Centralized error handling
 *  - Optional static frontend serving in production
 * 
 * ==========================
 * ENVIRONMENT VARIABLES USED
 * ==========================
 *  PORT                   : Port number to run the server (e.g., 5000)
 *  NODE_ENV               : Environment type (development | production)
 *  CLOUDINARY_CLOUD_NAME   : (Optional) Cloudinary config
 *  CLOUDINARY_API_KEY      : (Optional) Cloudinary config
 *  CLOUDINARY_SECRET       : (Optional) Cloudinary config
 * 
 * ===================
 * ROUTE STRUCTURE
 * ===================
 *  GET     /                    → Health check endpoint (returns 'hello')
 *  /api/user                     → User routes (login, register, etc.)
 *  /api/contacts                 → Contact routes (add, get, delete emergency contacts)
 *  /api/reviews                  → Review routes (post, get reviews)
 *  /api/profile                  → Profile routes (get/update user profile)
 * 
 * ===================
 * ERROR HANDLING
 * ===================
 *  Any unhandled error will be caught by centralized error handler
 *  - Logs error stack trace
 *  - Responds with 500 status and error message (message visible in development)
 * 
 * ===================
 * FRONTEND INTEGRATION
 * ===================
 *  In production, the server serves static files from:
 *      /frontend/dist/
 *  and handles client-side routing by sending index.html for unknown routes.
 * 
 * ===================
 * CORS CONFIGURATION
 * ===================
 *  - In production: allows requests from https://woman-safety-app.vercel.app
 *  - In development: allows requests from http://localhost:5173, http://127.0.0.1:5173
 *  - Supports credentials (cookies, auth headers)
 * 
 * ===================
 * SETUP
 * ===================
 *  1️⃣ Install dependencies:
 *      npm install
 * 
 *  2️⃣ Create .env file:
 *      PORT=5000
 *      NODE_ENV=development
 *      CLOUDINARY_CLOUD_NAME=your-cloud-name
 *      CLOUDINARY_API_KEY=your-api-key
 *      CLOUDINARY_SECRET=your-secret
 * 
 *  3️⃣ Start server:
 *      NODE_ENV=development node server.js
 * 
 * ===================
 * AUTHOR
 * ===================
 *  © 2025 Aryan Shukla
 * 
 */

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import UserRoutes from "./Routes/User.Routes.js";
import ContactRoutes from "./Routes/Contacts.Routes.js";
import ReviewRoutes from "./Routes/Review.Routes.js";
import ProfileRoutes from "./Routes/Profile.Routes.js";
 
import ConnectDb from "./config/db.js";

dotenv.config();
const app = express();
const _dirname = path.resolve();


// Configure CORS to allow only specific origins and credentials
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? 'https://woman-safety-app.vercel.app'
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));

// Middleware: parse JSON and url-encoded bodies + cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
 

// Register API routes
app.use("/api/user", UserRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/profile", ProfileRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("hello");
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server on specified port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  ConnectDb();
  console.log(`Server started on port ${PORT}`);
});
