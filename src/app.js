const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const validator=require("validator");
const {connectDB}=require("./config/databse");
const {UserInfo}=require("./models/user")
const {validationSignup} = require("./utils/validation");
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser')
const {userAuth}=require("./middlewere/authorized");

// const checkEmailIsvalide=(email)=>{
//     const isemailvalid=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
//     if(!isemailvalid) return false;

//     return true;
// }

app.get("/",(req,res)=>{
    res.send("This is My First Page");
})

app.use(express.json());
app.use(cookieParser());
// signup the user
app.post("/signup",async (req,res)=>{
    const data=req.body;
    const {firstName,lastName,email,password,gender,age}=data;
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
                age
            });
            await user.save();
            res.send("userInfo Is added");
        }catch(error){
            res.status(400).send("Error: " + error.message)
        }
    

})

// login the user
app.post("/login",async(req,res)=>{
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
            const hashPassworduser=user?.password;
            // console.log(hashPassworduser)
            const uservalide=await bcrypt.compare(password, hashPassworduser)
            
                if(uservalide){ 
                    console.log(user)
                    // Password is validate
                    const token=await jwt.sign({_id:user?._id},"TinderDB@1234");
                    res.cookie("Token",token);

                    res.send("Login Succsessfully");
                }else{
                    throw new Error("Password is Invalide");
                }
            }
        }catch(err){
        // console.log(err)
        res.status(404).send("Error: "+err.message);
     }


})

// Profile of user
app.get("/profile",userAuth,async(req,res)=>{
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

// feedapi all userdata
app.get("/feed",async(req,res)=>{
    try{
        const allUsers=await UserInfo.find({});
        console.log("Type of all users",typeof(allUsers))
        res.send(allUsers) ;
    }catch(err){
        res.status(404).send("Something went wrong");
    }
})

// delete api 
app.delete("/delete",async(req,res)=>{
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

// patch api find the user
app.patch("/user/:userID",async(req,res)=>{
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

// app.patch("/user",async(req,res)=>{
//     const userLastName=req.body.lastName;
//     const data=req.body;
//     try {
//         const ALLOW_UPDATE=["photoURL","skills","about","age","gender"];
//         const isUpdateAllow=Object.keys(data).every((key)=>{
//             return (key==="email" || key==="firstName" || key ==="password")? false : true;
//         }
      
//     );
        
//         if(!isUpdateAllow){
//             throw new Error("You can't Upadte");
//         }


//     const updatedUser=await UserInfo.updateOne({lastName:userLastName},data,{
//         runValidators:true
//     } );
//     res.send(updatedUser);
//     } catch (error) {
//         res.status(404).send("somiting went wrong inupdate "+error.message);
//     }
// })

app.get("/user",async(req,res)=>{
    const firstNameOfUser=req.body.firstName;
    try{
        const allUser = await UserInfo.findOne({firstName:firstNameOfUser});
        res.send(allUser); 
    }catch(err){
        res.status(404).send("User not found");
    }
  
})


connectDB().then(()=>{
    console.log("database is created")
    app.listen(7777,()=>{
        console.log("server is created")
    })
}).catch((Error)=>{
    console.log("dtaabase is not connected so server is not created",Error);
})

















// const express=require("express");
// const {authorized}=require("./middlewere/authorized")
// const app=express();
// const {connectDB}=require("./config/database");
// app.get("/",(req,res)=>{
//     res.send("Server is created")
// })

// connectDB().then(()=>{
//     console.log("Database is comnnected ");
//     app.listen(7777,()=>{
//         console.log("NodeJs server is running ");
        
//     })
// })
// .catch((e)=>{
//     console.log("Error is there , db is not connect ",e)
// })



// // middleware and error handling
// app.use("/admin",authorized);

// app.use("/admin/id",(req,res)=>{
//     console.log("This is from authorized");
//         res.send("Hello Im admin and I'm Authorized");
//     }
// )
// app.use("/admin/delete",(req,res)=>{
//     res.send("Admin Delete the data");
// }
// )


// // Error Handling
// // Using try catch

// app.use("/test",(req,res)=>{
//     try {
//         console.log("Error");
//         throw new Error("New Erro is here");
//     } catch (error){
//         console.log("inside catch")
//         res.status(500).send("try catch error");
//     }

//     // res.send("No error");

// })

// // Using wild card error handling
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Please Fixed the error");
//     }
// })


// app.use("/user",(req,res,next)=>{
//     console.log("1st Route handler")
//      res.send("Im user");
// })





// "------------------------------------------------"



// app.use("/test",(req,res)=>{
//     res.send("Im in use case why???")
// })
// LETS CHECK THE ROUNTING IN ADAVANCE 

// app.get("/abd(Raj)?c",(req,res)=>{
//     res.send({firstName:"Raj Walke",age:21})
// })

// app.get("/a(d)b+c",(req,res)=>{
//     res.send({firstname:"Raj",lastName:"Walke"});
// });

// app.get("/ij*k",(req,res)=>{
//     res.send({firstname:"mansi",lastName:"Dhale"});
// })

// app.get(/a/,(req,res)=>{
//     res.send({firstname:"Raj",lastName:"Walke"});
// });
// app.get(/.*fly$/,(req,res)=>{
//     res.send({firstname:"Raj",lastName:"Walke"});
// })

// app.get("/user/:userId/:userName/:pass",(req,res)=>{
//     res.send(req.params);
// }
// );

// app.post("/test",(req,res)=>{
//     res.send("It is Postr methode for testing")
// })

// app.delete("/test",(req,res)=>{
//     res.send("It is Delete methode for testing");
// })
// app.use("/home/route",(req,res)=>{
//     res.send("It is my home routing page");
// })
// app.use("/home",(req,res)=>{
//     res.send("It is my home page");
// })

// app.use("/about",(req,res)=>{
//     res.send("Its is my about page")
// })
// app.get("/",(req,res)=>{
//     res.send("Hello Namste Everyone");
// })
