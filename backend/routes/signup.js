import express from "express";
import Signup from "../models/signup.js"; // Import the Signup model

const router = express.Router();

// Signup POST route (User Registration)
router.post("/", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Check if user already exists
    let exist = await Signup.findOne({ email: email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new Signup({
      email,
      name,
      password,
    });

    // Save the user in the database
    await newUser.save();

    res.status(201).json({ message: "Signup successful!", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
