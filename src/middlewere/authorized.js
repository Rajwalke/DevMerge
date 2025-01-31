// const authorized=(req,res,next)=>{
//     // check the admin is authorized or not by token
//     const token="xyz";
//     const auth=token==="xyz";
//     if(auth){
//     // if it is authorized the go
//         next();
//     }else{
//     // if it is not retunr unauthorized 
//         
//     }
// }
const jwt=require('jsonwebtoken');
const {UserInfo}=require("../models/user");
const userAuth=async(req,res,next)=>{
   try{
        const cookie=req.cookies;

        const{Token}=cookie;
        // console.log("Token from auth",Token);
        if(!Token){
            throw new Error("Tokenis invalide");
        }
        const decodedToken=await jwt.verify(Token,"TinderDB@1234");
        const {_id}=decodedToken;
        const isUser=await UserInfo.findById(_id);
        if(isUser){
            req.user=isUser;
            req.userID=_id;
            next();
        }else{
            throw new Error("Please Login or Signup");
        }

   }catch(err){
        res.status(400).send("Error: "+err.message);
   }
}
module.exports={userAuth};