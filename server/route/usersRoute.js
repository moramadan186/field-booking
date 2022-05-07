var express = require('express');
const router=express.Router();
var usersCtrl = require('../controller/usersController');


router.post("/Signup" ,usersCtrl.userSingUp);


module.exports =router;