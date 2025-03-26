const express=require("express");
const dotenv=require("dotenv");
const path=require("path");
const userRouter=require("./dynamicRoutes/userRoutes");
const blogRouter=require("./dynamicRoutes/blogRoutes");
const { connectMongodb } =require("./connection");
const cookieParser=require("cookie-parser");
const { authenticateCookie }=require("./middlewares/auth");
const Blog = require("./models/blog.models");

dotenv.config();
const app=express();
const port=process.env.PORT||3000;

connectMongodb();

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(authenticateCookie());

app.get("/",async (req,res)=>{
    const blogs=await Blog.find({});
    // console.log(blogs);
    res.render("home", {"user":req.user,"blogs":blogs} );
})
app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(port,()=>{
    console.log(`Server Listening On port ${port}`)
});