const Seller = require("../models/Seller");
const mongoose = require("mongoose");

exports.updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const seller = await Seller.findByIdAndUpdate(id, updates, { new: true });

    if (!seller) {
      return res.status(404).json({
        status: 404,
        message: "Seller not found",
        data: null,
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Seller updated successfully",
      data: seller,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while updating the seller",
      data: null,
      error: error.message,
    });
  }
};

exports.getSellerList = async (req, res) => {
  try {
    const sellers = await Seller.find();

    res.status(200).json({
      status: 200,
      message: "Sellers fetched successfully",
      data: sellers,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the sellers",
      data: null,
      error: error.message,
    });
  }
};

exports.getSellerDetails = async (req, res) => {
  try {
    const { id } = req.params; // Up

    // Validate id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid seller ID format",
        data: null,
        error: null,
      });
    }

    const seller = await Seller.findById(id);
    console.log(id);
    console.log(seller);
    if (!seller) {
      return res.status(404).json({
        status: 404,
        message: "Seller not found",
        data: null,
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Seller details fetched successfully",
      data: seller,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the seller details",
      data: null,
      error: error.message,
    });
  }
};
