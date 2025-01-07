const express=require("express");

const app=express();
app.use("/home",(req,res)=>{
    res.send("It is my home page");
})
app.use("/about",(req,res)=>{
    res.send("Its is my about page")
})
app.use((req,res)=>{
    res.send("Hello Namste Everyone");
})



app.listen(7777,()=>{
    console.log("NodeJS Server is Running");
})