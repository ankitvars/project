const Seller = require("../models/Seller");

exports.getSeller = async (req, res) => {
  const { id } = req.params;
  const seller = await Seller.findById(id).populate("products");
  res.json(seller);
};

exports.updateSeller = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const seller = await Seller.findByIdAndUpdate(id, updates, { new: true });
  res.json(seller);
};
