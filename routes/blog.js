const {Router} = require('express');
const multer = require('multer');
const path = require('path');

const Blog = require("../models/blog");
const comment = require("../models/comment");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
     const fileName = `${Date.now()}-${file.originalname}`;
     cb(null,fileName);
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
   return res.render("addblog",{
    user:req.user
   });
})

router.get("/:id", async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("CreatedBy");
  const comments = await comment.find({blogId: req.params.id}).populate("CreatedBy");
 
  return res.render("blog",{
    user: req.user,
    blog,
    comments,
  })
});

router.post("/comment/:blogId", async(req,res)=>{

  await comment.create({
    content: req.body.content,
    blogId :req.params.blogId,
    CreatedBy:req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);

});


router.post("/", upload.single("coverImage"),async (req,res)=>{
   const {title , body} = req.body;
   const blog = await Blog.create({
    body,
    title,
    CreatedBy:req.user._id,
    CoverImageURL:  `/uploads/${req.file.filename}`,

   })
    res.redirect("/")

})

module.exports = router;
