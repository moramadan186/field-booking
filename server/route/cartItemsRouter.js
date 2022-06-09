var express = require("express");
const router = express.Router();
var cartCtrl = require("../controller/cartItems");

router.get("/cart/:userId", cartCtrl.cartItems);
router.post("/addcart", cartCtrl.addCart);
router.delete("/deletecart/:bookedId", cartCtrl.deleteCartItems);
router.post("/pay", cartCtrl.paymemt);

module.exports = router;
