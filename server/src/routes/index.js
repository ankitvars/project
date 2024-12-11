const express = require("express");

const { register, login } = require("../controllers/authController");

const {
  getProductList,
  updateProduct,
} = require("../controllers/productController");
const {
  updateSeller,
  getSellerList,
  getSellerDetails,
} = require("../controllers/sellerController");

const auth = require("../middleware/auth");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/products", auth, getProductList);
router.put("/products/:id", auth, updateProduct);

router.get("/sellers", auth, getSellerList);
router.put("/sellers/:id", auth, updateSeller);
router.get("/sellers/:id", auth, getSellerDetails);

module.exports = router;
