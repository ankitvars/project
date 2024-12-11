const { Schema, model } = require("mongoose");

const sellerSchema = new Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

module.exports = model("Seller", sellerSchema);
