const express=require("express");
const User=require("../models/user.models");
const router=express.Router();
const multer  = require('multer');
const Blog=require("../models/blog.models");
const Comments=require("../models/comments.models");
const path=require("path");
const { restrictTo } =require("../middlewares/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })
router.get('/addnewblog',(req,res)=>{
    return res.render("addblogs",{ "user":req.user});
});
router.post('/',upload.single("coverimg"),async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    const { title, content }=req.body;
    const coverImgUrl = req.file.filename;
    await Blog.create({
        title,
        content,
        coverImgUrl:`/uploads/${coverImgUrl}`,
        "createdBy":req.user._id,
    });
    return res.redirect("/");
});
router.post('/:id/comment',async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    console.log("Request Body:", req.body);
    const { comment }=req.body;
    await Comments.create({
        comment,
        "createdFor":req.params.id,
        "createdBy":req.user._id,
    });
    return res.redirect(`/blog/${req.params.id}`);
});
router.get('/:id',restrictTo,async(req,res)=>{
    const user=req.user;
    const blog =await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comments.find({"createdFor":req.params.id}).populate("createdBy")||[];
    console.log(blog);
    res.render("blog",{ "user":user,"blog":blog,"comments":comments,});
})
module.exports=router;
