var express = require("express");
const router = express.Router();
var clubCtrl = require("../controller/clubController");

router.get("/adminclubs/:adminsId", clubCtrl.adminClubs);
router.get("/clubdashboard/:clubId", clubCtrl.clubsDashboard);
router.post("/addclub", clubCtrl.addNewClub);
router.post("/updateclub", clubCtrl.updateClub);
router.delete("/deleteclub/:clubId", clubCtrl.deleteClub);

module.exports = router;
