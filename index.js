const express = require('express');
const path = require('path');


 const app = express();
 const userroute = require("./routes/user");
 const blogroute = require("./routes/blog");
 require('./database/conn');
 const cookiparser =require('cookie-parser');
const { checkAuthenticationCookie } = require('./middleware/authe');
 const Blog = require("./models/blog");

 port =8000;

 

 app.set('view engine','ejs')
 app.set("views",path.resolve("./views"));

 app.use(express.urlencoded({extended:false}))
 app.use(cookiparser());
 app.use(checkAuthenticationCookie("token"));
  app.use(express.static(path.resolve('./public')));



 app.get("/", async(req,res)=>{
   const allblog = await Blog.find({});

    res.render("home",{
      user: req.user,
      blogs : allblog,
    });
 })

 
 app.use("/user",userroute);
 app.use("/blog",blogroute);

 app.listen(port, ()=>{
    console.log(`port strat server:${port}`)

 });