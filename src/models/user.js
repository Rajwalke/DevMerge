// NEVER TRUST USER INPUT DATA
const mongoose=require("mongoose");
const validator=require("validator")
const {ProfileURL}=require("../utils/imageURL")
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50

    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique: true,
        trim:true,
        // validate(value){
        //     const validEmaile=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
        //     if(validEmaile){
        //         return true;
        //     }else{
        //         return false;
        //     }
        // }
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valide");
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not Strong")
            }
        }
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(value === "male" || value ==="female" || value ==="others"){
                return true;
            }
            else{
                throw new Error("Please enter the gender")
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    about:{
        type:String,
        default : "This information is about the user",
        maxLength:50
    },
    skills:{
        type:[String]
    },
    photoURL:{
        type:String,
        
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("PhotoUrl is Inavlide");
            }
        },
        default : ProfileURL,
    }
},{
    timestamps:true
});

const UserInfo=mongoose.model("UserInfo",userSchema);

module.exports={UserInfo};