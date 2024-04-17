const express=require("express")
const router=express.Router()
const {getAllUsers}=require("../../Controllers/usersController/usersController")
const {updateUser,createStudent}=require("../../Controllers/usersController/usersController")

router.get("/getAllUsers",getAllUsers)
router.put("/updateStatus",updateUser)
router.post("/createStudent",createStudent)
module.exports=router