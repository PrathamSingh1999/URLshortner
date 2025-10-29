import {User} from '../models/user.js'
import { v4 as uuidv4 } from 'uuid';
import {setUser,getUser} from '../services/auth.js'

async function handleUserSignup(req,res) {
    const {name, email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.render("home");
}

async function handlUserLogin(req,res) {
    const {email,password}=req.body;
    const user=await User.findOne({email,password});

    if(!user) return res.render('login',{
        error:'Invalid Username or Password',
    })
    
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
    
}

export {handleUserSignup,handlUserLogin}