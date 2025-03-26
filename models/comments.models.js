
const mongoose=require("mongoose");
const User = require("./user.models");
const Blog = require("./blog.models");

const commentsSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    createdFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},{timestamps:true});

const Comments= mongoose.model('Comments',commentsSchema);
module.exports=Comments;