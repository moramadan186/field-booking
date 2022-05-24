var express = require('express');
const router=express.Router();
var searchCtrl = require('../controller/searchController');

router.post("/search" ,searchCtrl.search);
router.get("/selectedClub/:club_id" ,searchCtrl.selectedClub);


module.exports =router;