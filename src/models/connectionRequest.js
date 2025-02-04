const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({
    formUserId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not Status`
        }
    }
},{
    timestamps:true
})

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports={ConnectionRequestModel};