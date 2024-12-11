const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["seller", "admin"], default: "seller" },
  },
  { timestamps: true },
);

module.exports = model("User", userSchema);
