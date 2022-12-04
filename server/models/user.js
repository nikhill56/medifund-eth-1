const mongoose=require('mongoose')

const cbuteUserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImg:{
        type:String,
        required:true
    },
    fundsRaised:{
        type:Array,
        required:true
    },
    fundsDonated:{
        type:Array,
        required:true
    },
    notifications:{
        type:Array,
        required:true
    }
},{timestamps:true}) 

module.exports=mongoose.model("CbuteUser",cbuteUserSchema)