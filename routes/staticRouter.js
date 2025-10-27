import express from "express";
import { URL } from "../models/url.js";
const router=express.Router();

router.get('/',async (req,res)=>{
    const allURLs=await URL.find({})
    return res.render("home",{
        urls:allURLs,
    })
})


export default router;
