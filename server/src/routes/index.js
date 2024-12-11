const express = require("express");

const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const {
  getProductList,
  updateProduct,
  getProductDetails,
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
router.get("/profile", auth, getProfile);
router.put("/profile/:id", auth, updateProfile);

router.get("/products", auth, getProductList);
router.get("/product/:id", auth, getProductDetails);
router.put("/products/:id", auth, updateProduct);

router.get("/sellers", auth, getSellerList);
router.put("/sellers/:id", auth, updateSeller);
router.get("/seller/:id", auth, getSellerDetails);

module.exports = router;
