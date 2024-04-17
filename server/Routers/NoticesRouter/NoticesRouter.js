const express = require("express");
const router = express.Router();
const {createNotice}=require("../../Controllers/noticesController/noticesController")
const {getNotices}=require("../../Controllers/noticesController/noticesController")

router.post("/createNotice",createNotice)
router.get("/getNotices",getNotices)

// /api/getNotices
// getNotices
module.exports = router;