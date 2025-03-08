const express=require('express');
const { userAuth } = require('../middlewere/authorized');
const {ConnectionRequestModel}=require("../models/connectionRequest");
const { isStatusValide } = require('../utils/validation');
const { UserInfo } = require('../models/user');
const requestRouter=express.Router();
const {isValideReviewStatus} =require("../utils/validation")
// connection request send from user to another user
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    // const body=req.body;
    const toUserId=req.params.toUserId;
    // const user=req.user;
    const formUserId =req.user._id;
    const status=req.params.status;

    try{ 
        // if(toUserId == formUserId){
        //     throw new Error("self reuqest is not allowed")
        // }
        const isAllowStatus=isStatusValide(status);
        if(!isAllowStatus){
            throw new Error("Invalide Status " + status);
        }

        const toUserInfo=await UserInfo.findById(toUserId);
        if(!toUserInfo){
            throw new Error("User doesn't exist");
        }
        // check,there is an existing connection request 
        const checkTouserIdExist=await ConnectionRequestModel.findOne({toUserId:toUserId,formUserId:formUserId});
        if(checkTouserIdExist){
            throw new Error(`${req.user.firstName} you already send the connection request to ${toUserInfo.firstName}, You can't send request once again`);
            
        }
        const reverseCheck=await ConnectionRequestModel.findOne({formUserId:toUserId, toUserId:formUserId});
        if(reverseCheck){
            throw new Error(`${toUserInfo.firstName} Already send the connection request to you`)
        }

        const sendConnection=new ConnectionRequestModel({
            formUserId,
            toUserId,
            status
        })
        await sendConnection.save();
        res.json({
            message:`${req.user.firstName} is ${status} ${toUserInfo.firstName}`
        })

    }catch(err){
        res.status(400).send("Error : "+err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    const requestId=req.params.requestId; 
    const user=req.user;  // toUserID
    const status=req.params.status;
    try{
        if(!isValideReviewStatus(status)){
            throw new Error("Status is Invalide");
        }
        const connectionRequest=await ConnectionRequestModel.findOne({_id:requestId , toUserId: user._id, status:"interested"}).populate("formUserId","firstName lastName");
        if(!connectionRequest){
            throw new Error("Invalide connection request");
        }
        connectionRequest.status=status;
        await connectionRequest.save();
        res.json({message : `Connection request is ${status}`,
            connectionRequest
        })

    }catch(err){
        res.status(404).json({message:"Error : "+err.message});
    }
})

requestRouter.post("/profile/friend/:reqId/rejected",userAuth,async(req,res)=>{
    const loginUserId=req.userID;
    const friendId=req.params.reqId;
    const status="rejected";
    try{
        const friendInfo=await ConnectionRequestModel.findOne({
            $or:[
                {formUserId:loginUserId,toUserId:friendId,status:"accepted"},
                {formUserId:friendId,toUserId:loginUserId,status:"accepted"}
            ]
        });
        friendInfo.status=status;
        console.log(friendInfo.status)
        await friendInfo.save();
        res.json({message:friendInfo});
    }catch(err){
        res.status(400).json({Error : "Friend is not found"})
    }

})

module.exports=requestRouter;
