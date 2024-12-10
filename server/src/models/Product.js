const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: String,
    description: String,
    status: { type: String, enum: ["Available", "Sold"], default: "Available" },
    sellerId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = model("Product", productSchema);
