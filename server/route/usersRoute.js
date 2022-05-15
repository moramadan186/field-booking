var express = require('express');
const router=express.Router();
var usersCtrl = require('../controller/usersController');

router.post("/sign-up" ,usersCtrl.userSingUp);
router.put("/log-in" ,usersCtrl.userLogeIn);

module.exports =router;