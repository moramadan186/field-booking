var express = require("express");
const router = express.Router();
var adminCtrl = require("../controller/adminsController");

router.post("/admin-sign-up", adminCtrl.adminSingUp);
router.post("/admin-sign-in", adminCtrl.adminLogeIn);

module.exports = router;
