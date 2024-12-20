const Product = require("../models/Product");
const mongoose = require("mongoose");
exports.getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    const responseData = products.map((product) => ({
      ...product.toObject(),
      _id: product._id || product.id, // Ensure _id is present
    }));

    res.status(200).json({
      status: 200,
      message: "Product list fetched successfully!",
      data: responseData,
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

exports.getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is an ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid product ID",
        data: null,
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Product details fetched successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the product details",
      data: null,
      error: error.message,
    });
  }
};
