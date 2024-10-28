import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // maxLength: [25, "Name cannot be longer than 25 characters"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\../, "Please enter a valid email address"],
  },
  password: {
    type: String,
    // match: [
    //   /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
    //   "Password must be between 8 - 12 characters, and contain at least one special character",
    // ],
    required: true,
  },
  type: {
    type: String,
    enum: ["doctor", "patient"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", userSchema);
