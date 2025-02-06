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

connectionRequestSchema.index({formUserId:1,toUserId:1});

connectionRequestSchema.pre("save",function(next){
    if(this.formUserId.equals(this.toUserId)){
        throw new Error("Can't send connection request to yourself");
    }
    next();
})

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports={ConnectionRequestModel};