const express=require("express")
const router=express.Router()
const {singIn}=require("../../Controllers/authControllers/authController")
const {login}=require("../../Controllers/authControllers/authController")
const {session}=require("../../Controllers/authControllers/authController")
router.post("/signUp",singIn)
router.post("/login",login)
router.post("/session",session)
module.exports=router