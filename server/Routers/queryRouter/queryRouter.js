const express=require("express")
const router=express.Router()
const {createQuery}=require("../../Controllers/queryController/queryController")
const {getQuries}=require("../../Controllers/queryController/queryController")
const {updateIstRemarks}=require("../../Controllers/queryController/queryController")
const {searchQueryByName}=require("../../Controllers/queryController/queryController")
const {searchQueryByDate}=require("../../Controllers/queryController/queryController")
const {updateFinalStatus}=require("../../Controllers/queryController/queryController")




// searchByDate
// upFinal
// updateFinalStatus
router.post("/submitQuery",createQuery)
router.get("/getQuries",getQuries)
router.put("/istReminderRemarks",updateIstRemarks)
router.put("/secReminderRemarks",updateIstRemarks)
router.post("/searchQuery",searchQueryByName)
router.post("/searchByDate",searchQueryByDate)
router.put("/upFinal",updateFinalStatus)








module.exports=router