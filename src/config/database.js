const mongoose=require("mongoose");
// const {connect}=mongoose;

const connectDB=async()=>{
    await mongoose.connect(
       "mongodb+srv://NodejsUser:cAhw61wUdVlImDY9@namastenodejs.mq8cm.mongodb.net/devTinder"
    )
}

module.exports={connectDB};