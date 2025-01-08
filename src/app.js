const express=require("express");

const app=express();
app.use("/tests",(req,res)=>{
    res.send("Im in use case why???")
})
app.get("/test",(req,res)=>{
    res.send({firstName:"Raj Walke",age:21})
})

app.post("/test",(req,res)=>{
    res.send("It is Postr methode for testing")
})

app.delete("/test",(req,res)=>{
    res.send("It is Delete methode for testing");
})
// app.use("/home/route",(req,res)=>{
//     res.send("It is my home routing page");
// })
// app.use("/home",(req,res)=>{
//     res.send("It is my home page");
// })

// app.use("/about",(req,res)=>{
//     res.send("Its is my about page")
// })
app.get("/",(req,res)=>{
    res.send("Hello Namste Everyone");
})



app.listen(7777,()=>{
    console.log("NodeJS Server is Running");
});