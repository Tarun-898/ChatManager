const mongoose=require("mongoose");
const chat=require("./models/chat.js");
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let allChats=[
    {from:"tony",
    to:"supriya",
    msg:"hlo baby",
    created_at:new Date()
    },
    {
        from :"bruce",
        to:"thor",
        msg:"mittr",
        created_at:new Date()
    },
    {
        from :"steve",
        to:"jobs",
        msg:"badmosh",
        created_at:new Date()
    },
    
];
chat.insertMany(allChats);