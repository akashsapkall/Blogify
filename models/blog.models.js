
const mongoose=require("mongoose");
const User = require("./user.models");

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    coverImgUrl:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},{timestamps:true});

const Blog= mongoose.model('Blog',blogSchema);
module.exports=Blog;