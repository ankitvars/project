const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require("../controllers/productController");
const { getSeller, updateSeller } = require("../controllers/sellerController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/products", auth, getProducts);
router.get("/products/:id", auth, getProduct);
router.put("/products/:id", auth, updateProduct);
router.post("/products/add", auth, addProduct);

router.get("/sellers/:id", auth, getSeller);
router.put("/sellers/:id", auth, updateSeller);

module.exports = router;
