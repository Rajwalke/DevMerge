const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    }
});

const UserInfo=mongoose.model("UserInfo",userSchema);

module.exports={UserInfo};