import express from "express";
import mongoose from "mongoose";
import Order from "../models/order.js";

const router = express.Router();

/**
 * @desc Create a new order
 * @route POST /api/orders
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, city, state, pincode, paymentMethod, items, total } = req.body;

    if (!name || !address || !paymentMethod || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    for (const [idx, item] of items.entries()) {
      const idFromClient = item.productId || item._id; 
      if (!idFromClient) {
        return res.status(400).json({ message: `Item ${idx} missing product id` });
      }
      if (!mongoose.Types.ObjectId.isValid(idFromClient)) {
        return res.status(400).json({ message: `Item ${idx} has invalid product id` });
      }
      if (!item.name || !item.price || !item.quantity) {
        return res.status(400).json({ message: `Item ${idx} is missing name, price, or quantity` });
      }
    }

    const formattedItems = items.map((item) => ({
      productId: item.productId || item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const newOrder = new Order({
      name, email, phone, address, city, state, pincode, paymentMethod,
      items: formattedItems,
      total,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
});

/**
 * @desc Get all orders for a specific user by email or phone
 * @route GET /api/orders/user-orders
 */
router.get("/user-orders", async (req, res) => {
  try {
    const { email, phone } = req.query;
    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone number is required." });
    }

    const query = {};
    if (email) query.email = email;
    if (phone) query.phone = phone;

    const orders = await Order.find(query).sort({ createdAt: -1 }).select("total items createdAt");
    res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to fetch user orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * @desc Get recent orders (for Owner Dashboard)
 * @route GET /api/orders/recent
 */
router.get("/recent", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(10); // latest 10 orders
    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch recent orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;



// import express from "express";
// import Order from "../models/orderModel.js";

// const router = express.Router();

// // GET /api/orders/user-orders?email=xyz@example.com
// router.get("/user-orders", async (req, res) => {
//   const { email, phone } = req.query;

//   if (!email && !phone) {
//     return res.status(400).json({ message: "Email or phone is required" });
//   }

//   try {
//     const query = {};
//     if (email) query.email = email;
//     if (phone) query.phone = phone;

//     const orders = await Order.find(query).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders", error: err.message });
//   }
// });

// export default router;
