const express=require('express');
const bcrypt=require("bcrypt");
const validator=require("validator");
const {UserInfo}=require("../models/user")
const {validationSignup} = require("../utils/validation");
const { userAuth } = require('../middlewere/authorized');
const jwt=require('jsonwebtoken')
const authRouter=express.Router();

// signup the user
authRouter.post("/signup",async (req,res)=>{
    const data=req.body;
    const {firstName,lastName,email,password,gender,age,photoURL}=data;
    // const userData={
    //     firstName:"SaiPangle",
    //     lastName:"swant",
    //     password:"SaiPangle@2004"
    // }
        try{
            validationSignup(data);
            const passwordHash= await bcrypt.hash(password,10);
            const user=new UserInfo({
                firstName,
                lastName,
                email,
                password:passwordHash,
                gender,
                age,
                photoURL
            });
            await user.save();
            const token= await jwt.sign({_id:user._id},"TinderDB@1234",{expiresIn:'7d'});
            res.cookie("Token",token);
            res.json({message:"Signup Succsessfully",
                userInfo:user
            });
        }catch(error){
            res.status(400).json({message:error.message})
        }
    

})

// login the user
authRouter.post("/login",async(req,res)=>{
    const data=req.body;

    const {email,password}=data;
    const userEmail=email;
     try{

        if(!validator.isEmail(email)){
            throw new Error("Check the EmailId");
        }
        const user=await UserInfo.findOne({email:userEmail})
        if(!user){
            throw new Error("Email is Incorrect");
        }
        else{
            // const hashPassworduser=user?.password;
            // console.log(hashPassworduser)
            const uservalide=await user.getValidate(password);
            
                if(uservalide){ 
                    // console.log(user)
                    // creat the token
                    const token=await user.getJWT();
                    res.cookie("Token",token);
                    res.json({message:"Login Succsessfully",
                        userInfo:user
                    });
                }else{
                    throw new Error("Password is Invalide");
                }
            }
        }catch(err){
        // console.log(err)
        res.status(404).json({message:err.message});
     }


})

// Logout the user
authRouter.post("/logout",userAuth,async(req,res)=>{
    res.cookie("Token",null,{expires:new Date(Date.now())})
    res.json({message : "logout"});
})
module.exports=authRouter;