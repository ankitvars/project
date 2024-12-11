const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    _id: { type: String },
    name: String,
    description: String,
    status: { type: String, enum: ["Available", "Sold"], default: "Available" },
    sellerId: { type: Schema.Types.ObjectId, ref: "Seller" },
    added_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = model("Product", productSchema);
