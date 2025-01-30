const express=require("express");
const app=express();
const {connectDB}=require("./config/databse");
const cookieParser=require('cookie-parser')
const authRouter=require("./routes/authRouter");
const profileRouter=require("./routes/profileRouter");
const userRouter=require("./routes/userRouter");
const requestRouter=require("./routes/requestRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",userRouter);
app.use("/",requestRouter);




connectDB().then(()=>{
    console.log("database is created")
    app.listen(7777,()=>{
        console.log("server is created")
    })
}).catch((Error)=>{
    console.log("dtaabase is not connected so server is not created",Error);
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

// app.get("/user",async(req,res)=>{
//     const firstNameOfUser=req.body.firstName;
//     try{
//         const allUser = await UserInfo.findOne({firstName:firstNameOfUser});
//         res.send(allUser); 
//     }catch(err){
//         res.status(404).send("User not found");
//     }
  
// })
















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
