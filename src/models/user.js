const mongoose=require("mongoose");
const {ProfileURL}=require("../utils/imageURL")
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique: true,
        minLength:2,
        maxLength:50

    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true,
        validate(value){
            const validEmaile=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
            if(validEmaile){
                return true;
            }else{
                return false;
            }
        }

    },
    password:{
        type:String,
        // required:true,
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(value === "male" || value ==="female" || value ==="others"){
                return true;
            }
            else{
                return false;
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    about:{
        type:String,
        default : "This information is about the user"
    },
    skills:{
        type:[String]
    },
    photoURL:{
        type:String,
        default : ProfileURL
    }
},{
    timestamps:true
});

const UserInfo=mongoose.model("UserInfo",userSchema);

module.exports={UserInfo};