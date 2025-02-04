const express=require('express');

const profileRouter=express.Router();
const {userAuth}=require("../middlewere/authorized");
const { UserInfo } = require('../models/user');
const {validationProfileEditData}=require("../utils/validation");
const bcrypt=require('bcrypt');

// Profile of user
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        // const cookie=req.cookies;
        // const {Token}=cookie;

        // if(!Token) throw new Error("Please Login");
        // const decodeToken=jwt.verify(Token,"TinderDB@1234");
        // const {_id}=decodeToken;
        // const userProfile=await UserInfo.findById(_id);
        const userProfile=req.user;
        console.log(userProfile)
        res.send("Profile is created"+userProfile)
    }catch(err){
        // console.log(err)
        res.status(404).send("Error: "+err.message);
     }
})
//  Profile edit
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{

    const user=req.user;
    const {_id}=user;
    const body=req.body;
    
    try{
        if(validationProfileEditData(body)){
        const updatedUser=await UserInfo.findByIdAndUpdate(_id,body,{runValidators:true,returnDocument:'after'})
        res.json({message:`${user.firstName}, your data is updated succsefully`,
            data:updatedUser
        })
        }
        
    }catch(err){
        res.status(404).send("Error: "+ err)
    }
})
// Password Password edit
profileRouter.patch("/profile/editPassword",userAuth,async(req,res)=>{
    const user=req.user;
    const {password,newpassword}=req.body;
    const hashPassword=user.password;
    try{
        const isPasswordMatch=await bcrypt.compare(password,hashPassword);
        if(!isPasswordMatch){
            throw new Error("Incorrect Password");
        }
        // res.send("password is match");
        const newHashPassword=await bcrypt.hash(newpassword,10);
        user.password=newHashPassword;
        user.save();
        res.cookie("Token",null,{expires:new Date(Date.now())});
        res.send("Password is change, Please LogIn with new Password");

    }catch(err){
        res.status(404).send("Error: "+err);
    }

})
module.exports=profileRouter;