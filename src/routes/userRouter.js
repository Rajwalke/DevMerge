const express=require('express');
const { UserInfo } = require('../models/user');
const { userAuth } = require('../middlewere/authorized');

const userRouter=express.Router();
// feedapi all userdata
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const allUsers=await UserInfo.find({});
        // console.log("Type of all users",typeof(allUsers))
        res.send(allUsers) ;
    }catch(err){
        res.status(404).send("Something went wrong");
    }
})
// delete api 
userRouter.patch("/user/:userID",async(req,res)=>{
    const userId=req.params.userID;
    const data=req.body

    try{
        const ALLOW_UPDATE=["gender","age","about","skills","photoURL"];
        const isUpdateAllow=Object.keys(data).every((key)=>
            ALLOW_UPDATE.includes(key)
        )
        if(!isUpdateAllow){
            throw new Error("can't Update this field");
        }
        if(data?.skills?.length >10){
            throw new Error("Only required less than 10 skillls")
        }
        const userInfoupdate=await UserInfo.findByIdAndUpdate(userId,data,{returnDocument:"after", runValidators:true});
        res.send(userInfoupdate);
    }catch(err){
        res.status(404).send("Something went wrong" + err.message);
    }

})
// patch api find the user
userRouter.delete("/delete",async(req,res)=>{
    const userFirstName=req.body.firstName;
    // const userLastName=req.body.lastName;
    // const userId=req.body._id;
   try{
    // const del=await UserInfo.deleteOne({firstName:userFirstName});
    const del=await UserInfo.deleteMany({firstName:userFirstName});
    // const del= await UserInfo.findOneAndDelete({firstName:userFirstName});
    // const del=await UserInfo.findByIdAndDelete({_id:userId});
    // const del=await UserInfo.findByIdAndDelete(userId);
    res.send(del);
   }catch(err){
    res.status(404).send("Somethiong went wrong on in delete operation");
   }
})

module.exports=userRouter;