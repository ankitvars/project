const Product = require("../models/Product");

exports.getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 200,
      message: "Product list fetched successfully!",
      data: products,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the products",
      data: null,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
        data: null,
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: product,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while updating the product",
      data: null,
      error: error.message,
    });
  }
};
