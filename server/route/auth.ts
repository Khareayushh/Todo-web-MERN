import express from "express";
import { auther, login, signup } from "../controller/userController";
import { authenticate } from "../middleware/authentication";

const router = express.Router()


router.post("/signup", signup);
router.post("/login", login);
router.get("/me",authenticate, auther);

export default router;