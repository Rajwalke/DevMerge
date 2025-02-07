const express=require('express');
const { UserInfo } = require('../models/user');
const { userAuth } = require('../middlewere/authorized');
const { ConnectionRequestModel } = require('../models/connectionRequest');

const userRouter=express.Router();

// get all pending user requests for loggedIn User

userRouter.get("/user/pendingrequest",userAuth,async(req,res)=>{
    const user=req.user;

    try{
        const allPendingRequest=await ConnectionRequestModel.find({toUserId:user?._id,status:"interested"}).populate("formUserId",["firstName","lastName","photoURL"]);
        if(!allPendingRequest){
            throw new Error("No request are pending")
        }
        res.json({message:"Pending connection requests",
            allPendingRequest
        })

    }catch(err){
        res.status(404).json({message:"Error : "+err.message})
    }


})

// who acdepted my invivation/request

userRouter.get("/user/connection/accepted",userAuth,async(req,res)=>{
    const loggedInUser=req.user;

    try{
        let allConnectionAccepted=await ConnectionRequestModel.find({
            $or:[
                {formUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted"}
            ]
        })
        .populate("toUserId","firstName lastName")
        .populate("formUserId","firstName lastName");

        // fetch the name of sender/reciver
        const data=allConnectionAccepted.map((row)=>{
            if(row.formUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }else{
                return row.formUserId;
            }
        })
        res.json({message:`This peoples are interested in you`,
            data
        })
    }catch(err){
        res.status(404).send("Error : "+err.message)
    }
})

// feedApi
userRouter.get("/user/feed",userAuth,async(req,res)=>{
    const loggedInUser=req.user;
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const skip=(page-1)*limit;
    try{
        const allUSerData=await UserInfo.find({})
        .select("firstName lastName age skills about gender photoURL")

        const feedData=await Promise.all(
        allUSerData.map(async(data)=>{
            const userId=data._id;
            if(userId.toString()===loggedInUser._id.toString())return null;
            // console.log(userId);
            const checkData=await ConnectionRequestModel.findOne({
                $or:[
                    {formUserId:userId,toUserId:loggedInUser._id},
                    {formUserId:loggedInUser._id,toUserId:userId}
                ]
            });
            if(checkData===null) return data;
            return null; 
            
        })
    )
    const data=feedData.filter((data)=> data!==null);
  
    res.json({userFeedData: data});
    }catch(err){
        res.status(404).json({message:"Error :"+err.message});
    }
})

// feedapi all userdata
// userRouter.get("/feed",userAuth,async(req,res)=>{
//     try{
//         const allUsers=await UserInfo.find({});
//         // console.log("Type of all users",typeof(allUsers))
//         res.send(allUsers) ;
//     }catch(err){
//         res.status(404).send("Something went wrong");
//     }
// })
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