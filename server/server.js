/**
 * ==========================================
 * Shakti Shield — Express Server
 * ==========================================
 * 
 * REST APIs for:
 *  - User auth (/api/user)
 *  - Emergency contacts (/api/contacts)
 *  - Reviews (/api/reviews)
 *  - Profile (/api/profile)
 * 
 * Features:
 *  - Env config via dotenv
 *  - CORS with credentials + restricted origins
 *  - Cookie & body parsing
 *  - Central error handler
 *  - Production static frontend serving
 * 
 * ===================
 * © 2025 Aryan Shukla
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

// ✅ CORS CONFIG
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://shakti-shield.vercel.app"]
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed from this origin: " + origin), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ Body + cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Connect DB
ConnectDb();

// ✅ Routes
app.use("/api/user", UserRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/profile", ProfileRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Shakti Shield API is running.");
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
