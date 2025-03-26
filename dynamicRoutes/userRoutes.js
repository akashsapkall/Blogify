const express=require("express");
const User=require("../models/user.models");
const crypto=require("crypto");
const router=express.Router();
const cookie=require("cookie");
router.get('/signin',(req,res)=>{
    res.render("signin");
});
router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.post("/signup",async(req,res)=>{
    const { name, email, password, role }=req.body;
    await User.create({
        name,
        email,
        password,
        role
    });
    return res.redirect("/");
});

router.post('/signin',async(req,res)=>{
    const { email, password }=req.body;
    try{
        const token=await User.matchPasswordandGenerateToken(email, password);
    res.cookie("token",token);
    return res.redirect("/");
    }catch(e){
        return res.render("signin",{ error:"Invalid Credentials!!!!"});
    }
});
router.get('/logout',async(req,res)=>{
    try{
        return res.clearCookie("token").redirect("/");
    }catch(e){
    }
});

module.exports=router;

// router.post('/signin',async(req,res)=>{
//     const { email, password }=req.body;
//     const user = await User.findOne({ email });
//     console.log(user);
//     if (!user) {
//         return res.status(401).send("Invalid User!!!");
//     }
//     const key = user?.salt;
// if (!key) return res.status(500).send("User salt not found!");
//     const incomingPasswordHash=crypto.createHmac('sha256',key)
//     .update(password)
//     .digest('hex');
//     if(incomingPasswordHash === user.password){
//         return res.redirect("/");
//     }
//     return res.redirect("/user/signin");
// });