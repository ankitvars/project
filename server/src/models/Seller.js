const { Schema, model } = require("mongoose");

const sellerSchema = new Schema({
  name: String,
  contactInfo: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Seller", sellerSchema);
