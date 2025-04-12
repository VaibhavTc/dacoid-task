import mongoose from "mongoose";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    const existingUser = await User.findOne({ email: "intern@dacoid.com" });

    if (existingUser) {
      console.log("User already exists");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Test123", salt);

    const user = new User({
      email: "intern@dacoid.com",
      password: hashedPassword,
    });

    await user.save();
    console.log("User created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding user:", err);
    process.exit(1);
  }
};

seedUser();
