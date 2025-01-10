const authorized=(req,res,next)=>{
    // check the admin is authorized or not by token
    const token="xyz";
    const auth=token==="xyz";
    if(auth){
    // if it is authorized the go
        next();
    }else{
    // if it is not retunr unauthorized 
        res.send(401).send("Unothorized admin");
    }
}

module.exports={authorized};