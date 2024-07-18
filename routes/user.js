const {Router} = require('express');
const user = require('../models/user');
const User = require('../models/user');
require("../services/authentication");

const router = Router();


router.get("/signin",(req,res)=>{
    return res.render("signin");

})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.post("/signin", async(req,res)=>{
    const {email,password} = req.body;
   try {
   // console.log(email,password);
    const token =  await User.matchpasswordAndGenrateTokan(email,password);

    //console.log('token',token);
    return res.cookie("token",token).redirect("/")
    
   } catch (error) {
    return res.render("signin",{
        error:"Incorect Email or Password"
    });

   }
})

router.get("/Logout", (req,res)=>{

    res.clearCookie("token").redirect("/");

})

router.post("/signup", async(req,res)=>{
    const {fullname,email,password} = req.body;
    await user.create({
        fullname,
        email,
        password
    })

    return res.redirect("/");
});

module.exports = router;

