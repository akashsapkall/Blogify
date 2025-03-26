const { createHmac, randomBytes } =require("node:crypto")
const mongoose=require("mongoose");
const {createToken} =require("../services/authentication");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImgUrl:{
        type:String,
        default:"/images/defaultAvtar.png",
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER',
    }

},{timstamps:true});

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')) return;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashedPassword;
    next();
})

userSchema.static('matchPasswordandGenerateToken', async function(email,password){
    const user=await this.findOne({ email });
    console.log(user);
    if(!user) throw new Error("User Not FOUND!");
    const salt=user.salt;
    const origpass=user.password;
    const hashPass=createHmac('sha256',salt)
    .update(password)
    .digest('hex');
    if(!( origpass=== hashPass)) throw new Error("Invalid Password!");
    const token=createToken(user);
    return token;
})
const User= mongoose.model('User',userSchema);
module.exports=User;