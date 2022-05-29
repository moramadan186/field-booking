var express = require('express');
const router=express.Router();
var cartCtrl = require('../controller/cartItems');

router.post("/addcart" ,cartCtrl.addCart);
router.delete("/deletecart/:bookedId" ,cartCtrl.deleteCartItems);


module.exports =router;