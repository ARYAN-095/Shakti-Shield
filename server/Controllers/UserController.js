import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import CreateToken from "../Utils/CreateToken.js";
import { OAuth2Client } from 'google-auth-library';
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @desc    Register a new user (email + password signup)
 */
const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide username, email, and password." });
  }

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isGoogleUser: false
    });

    await newUser.save();

    const token = CreateToken(newUser._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(201).json({
      _id: newUser._id,
      email: newUser.email,
      profilephoto: newUser.profilePhoto,
      reviews: newUser.reviews,
      contacts: newUser.contacts
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
};

/**
 * @desc    Login with email & password
 */
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.isGoogleUser) {
      return res.status(401).json({
        message: !user ? "No user found." : "Please login using Google for this account."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = CreateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(200).json({
      _id: user._id,
      email: user.email,
      profilephoto: user.profilePhoto,
      reviews: user.reviews,
      contacts: user.contacts
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

/**
 * @desc    Logout user (clear JWT cookie)
 */
const Logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    expires: new Date(0)
  }).json({ message: "Logout successful." });
};

/**
 * @desc    Login/Register via Google OAuth
 */
const GoogleAuthController = async (req, res) => {
  const { email, name, googleId, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.isGoogleUser) {
        return res.status(400).json({
          message: "Email is already registered with email/password login."
        });
      }

      user.googleId = googleId;
      user.profilePhoto = picture || user.profilePhoto;
      await user.save();
    } else {
      user = await User.create({
        username: name,
        email,
        googleId,
        profilePhoto: picture || "https://default.profile.photo/link",
        isGoogleUser: true
      });
    }

    const token = CreateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(200).json({
      _id: user._id,
      email: user.email,
      profilephoto: user.profilePhoto,
      reviews: user.reviews,
      contacts: user.contacts
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Server error during Google authentication." });
  }
};

/**
 * @desc    Check authentication status (from cookie token)
 */
const Authentication = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ authenticated: false, message: "User not found." });
    }

    res.status(200).json({
      authenticated: true,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    console.error("Auth check error:", error);
    const isJwtError = ["JsonWebTokenError", "TokenExpiredError"].includes(error.name);
    res.status(isJwtError ? 401 : 500).json({
      authenticated: false,
      message: isJwtError ? "Invalid or expired token." : "Server error."
    });
  }
};

/**
 * @desc    Get user details by email
 */
const GetUserInfo = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      profilePhoto: user.profilePhoto,
      reviews: user.reviews,
      contacts: user.contacts,
      isGoogleUser: user.isGoogleUser
    });
  } catch (error) {
    console.error("Get user info error:", error);
    res.status(500).json({ message: "Server error retrieving user info." });
  }
};

export { Signup, Login, Logout, GoogleAuthController, Authentication, GetUserInfo };
