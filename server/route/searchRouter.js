var express = require('express');
const router=express.Router();
var searchCtrl = require('../controller/searchController');

router.post("/search" ,searchCtrl.search);
router.get("/search/:clubId" ,searchCtrl.selectedClub);


module.exports =router;