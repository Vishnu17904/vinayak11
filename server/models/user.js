import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  // ✅ Add this field
  userType: {
    type: String,
    enum: ["user", "owner"],
    default: "user"
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { type: String, unique: true, required: true, lowercase: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true }
// }, {
//   timestamps: true
// });

// export default mongoose.model("User", userSchema);
