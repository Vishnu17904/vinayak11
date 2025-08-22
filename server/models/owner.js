import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  businessName: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model("Owner", ownerSchema);

