import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, isFeatured } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      isFeatured: isFeatured || false,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
