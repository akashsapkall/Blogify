const mongoose=require("mongoose");

function connectMongodb(){
    mongoose.connect(process.env._URL)
    .then(()=>{console.log("Connection Established!")})
    .catch((err)=>{console.log(err)})
}

module.exports={
    connectMongodb,
}