const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find().limit(5);
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  res.json(product);
};

exports.addProduct = async (req, res) => {
  const { name, description, status } = req.body;
  if (!name || !description || !status) {
    return res
      .status(400)
      .json({ error: "Name, description, and status are required" });
  }

  try {
    const product = new Product({ name, description, status });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};
