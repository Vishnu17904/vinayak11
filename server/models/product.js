import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: {
    type: String,
    enum: ["sweets", "namkeens", "festival"],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Product", productSchema);
