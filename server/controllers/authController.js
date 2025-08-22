import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Owner from "../models/owner.js";

// ------------------ SIGNUP ------------------
export async function signup(req, res) {
  try {
    const { userType, ...data } = req.body;

    if (!userType || !["user", "owner"].includes(userType)) {
      return res.status(400).json({ message: "Invalid or missing userType" });
    }

    const Model = userType === "owner" ? Owner : User;

    // ✅ Validate required fields
    if (!data.email || !data.password || !data.name || !data.phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await Model.findOne({ email: data.email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    data.password = await bcrypt.hash(data.password, 10);

    if (Model === User) {
      data.userType = userType;
    }

    const newUser = new Model(data);
    await newUser.save();

    return res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
}

// ------------------ LOGIN ------------------
export async function login(req, res) {
  try {
    const { userType = "user", email, password } = req.body;

    const validTypes = ["user", "owner"];
    if (!validTypes.includes(userType)) {
      return res.status(400).json({ message: "Invalid userType" });
    }

    const Model = userType === "owner" ? Owner : User;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Different response structure for Owner vs User
    const userData =
      userType === "owner"
        ? {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            businessName: user.businessName,
            createdAt: user.createdAt
          }
        : {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address || "",
            userType: user.userType,
            businessName: user.businessName || "",
            createdAt: user.createdAt
          };

    return res.status(200).json({
      message: "Login successful!",
      user: userData
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
}
