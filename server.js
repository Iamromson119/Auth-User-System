require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./user");
const requireAuth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/authdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    res.status(201).json({ msg: "User registered" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "No user found with that email" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
    res.json({ token, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Auth server running on " + PORT));
