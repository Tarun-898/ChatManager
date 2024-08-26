const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String
    },
    created_at:{
        type:Date,
        reuired:true
    },
});

const chat=mongoose.model("chat",chatSchema);
module.exports=chat;