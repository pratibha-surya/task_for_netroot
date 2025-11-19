
import express from "express"
import { login, Profile,  signup,  verifyOtp } from "../controller/userController.js"
import authMiddleware from "../middleware/authmiddleware.js"
const router = express.Router()
router.post("/signup",signup)
router.post("/login",login)
router.get ("/profile",authMiddleware,Profile)
router.post("/verify-otp", verifyOtp);
export default router