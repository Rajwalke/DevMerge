const express=require('express');

const profileRouter=express.Router();
const {userAuth}=require("../middlewere/authorized");


// Profile of user
profileRouter.get("/profile",userAuth,async(req,res)=>{
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

module.exports=profileRouter;