const express=require('express');
const { userAuth } = require('../middlewere/authorized');
const {ConnectionRequestModel}=require("../models/connectionRequest");
const { isStatusValide } = require('../utils/validation');
const { UserInfo } = require('../models/user');
const requestRouter=express.Router();

// connection request send from user to another user
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    // const body=req.body;
    const toUserId=req.params.toUserId;
    // const user=req.user;
    const formUserId =req.user._id;
    const status=req.params.status;

    try{
        const isAllowStatus=isStatusValide(status);
        if(!isAllowStatus){
            throw new Error("Wrong Status");
        }

        const toUserInfo=await UserInfo.findById(toUserId);
        if(!toUserInfo){
            throw new Error("User doesn't not exist");
        }

        const sendConnection=new ConnectionRequestModel({
            formUserId,
            toUserId,
            status
        })
        await sendConnection.save();
        res.json({
            message:`connection request send from ${req.user.firstName} to ${toUserInfo.firstName}`
        })

    }catch(err){
        console.log(err)
        res.status(400).send("Error : "+err.message);
    }
})


module.exports=requestRouter;
