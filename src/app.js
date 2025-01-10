const express=require("express");
const {authorized}=require("./middlewere/authorized")
const app=express();

app.use("/admin",authorized);

app.use("/admin/id",(req,res)=>{
    console.log("This is from authorized");
        res.send("Hello Im admin and I'm Authorized");
    }
)
app.use("/admin/delete",(req,res)=>{
    res.send("Admin Delete the data");
}
)


// Error Handling

app.use("/test",(req,res)=>{
    try {
        console.log("Error");
        throw new Error("New Erro is here");
    } catch (error){
        console.log("inside catch")
        res.status(500).send("try catch error");
    }

    // res.send("No error");

})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Please Fixed the error");
    }
})


app.use("/user",(req,res,next)=>{
    console.log("1st Route handler")
     res.send("Im user");
})


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
