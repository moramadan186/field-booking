var express = require("express");
const router = express.Router();
var searchCtrl = require("../controller/searchController");

router.post("/search", searchCtrl.search);
router.get("/club/:clubId/:date", searchCtrl.selectedClub);

module.exports = router;
