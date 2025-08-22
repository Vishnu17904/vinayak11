import express from "express";
import bcrypt from "bcryptjs";
import Owner from "../models/owner.js";

const router = express.Router();

// Owner Signup
router.post("/signup", async (req, res) => {
  const { name, email, phone, password, businessName } = req.body;

  try {
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner)
      return res.status(400).json({ message: "Owner already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newOwner = new Owner({ name, email, phone, password: hashedPassword, businessName });
    await newOwner.save();

    res.status(201).json({ message: "Owner registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Owner Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await Owner.findOne({ email });
    if (!owner)
      return res.status(404).json({ message: "Owner not found" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

     const { password: _, ...ownerData } = owner.toObject();

    res.json({ message: "Login successful", owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
