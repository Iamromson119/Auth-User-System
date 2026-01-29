const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/authdb")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

const SECRET = "MYSECRETKEY";

app.post("/register", async (req,res)=>{
  const {name,email,password} = req.body;
  const hash = await bcrypt.hash(password,10);
  await User.create({name,email,password:hash});
  res.json({msg:"User registered"});
});

app.post("/login", async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({msg:"No user"});

  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return res.status(400).json({msg:"Wrong password"});

  const token = jwt.sign({id:user._id},SECRET);
  res.json({token});
});

app.listen(5000, ()=>console.log("Auth server running"));
