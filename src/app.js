const express=require("express");
const app=express();
const {connectDB}=require("./config/databse");

const {UserInfo}=require("./models/user")

app.get("/",(req,res)=>{
    res.send("This is My First Page");
})

app.post("/signup",async (req,res)=>{
    const userData={
        firstName:"Prashant",
        lastName:"swant",
        password:"prashant@2004"
    }
    const user=new UserInfo(userData);
    try{
        await user.save();
        res.send("userInfo Is added");
    }catch(error){
        res.status(400).send("Something is wrong so d=userDtaa is not added")
    }
    
})

connectDB().then(()=>{
    console.log("database is created")
    app.listen(7777,()=>{
        console.log("server is created")
    })
}).catch((Error)=>{
    console.log("dtaabase is not connected so server is not created");
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
