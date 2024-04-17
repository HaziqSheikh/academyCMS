const express=require("express")
const router=express.Router()
const {getYearlySales}= require("../../Controllers/salesController/salesController")
router.get("/sales",getYearlySales)
module.exports = router;