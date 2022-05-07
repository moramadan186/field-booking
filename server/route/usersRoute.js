var express = require('express');
const router=express.Router();
var usersCtrl = require('../controller/usersController');
//test
router.post("/Signup" ,usersCtrl.userSingUp);


module.exports =router;