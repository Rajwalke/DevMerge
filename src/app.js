const express=require("express");

const app=express();



app.use("/user",[(req,res,next)=>{
    console.log("1st Route handler")
    next();
    //  res.send("Im user");
},
(req,res,next)=>{
    console.log("2nd Route Handler");
    // res.send("Im in second router function");
    next();
},
],
[
(req,res,next)=>{
    console.log("3rd Route Handler");
    // res.send("Im in Third router function");
    next();
},
],
(req,res,next)=>{
    console.log("4th Route Handler");
    res.send("Im in Fourth router function");
}


)


app.listen(7777,()=>{
    console.log("NodeJS Server is Running");
});




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
