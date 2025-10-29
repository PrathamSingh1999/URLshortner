import express from "express";
import {handleUserSignup,handlUserLogin} from "../controllers/user.js"

const router=express.Router();

router.post('/',handleUserSignup);
router.post("/login",handlUserLogin);

export default router;