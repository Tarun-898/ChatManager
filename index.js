const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

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

app.get("/",(req,res)=>{
    res.send("working");
});
app.listen(8080,()=>{
    console.log("listen");
});

app.get("/chats",async (req,res)=>{
    let chats=await chat.find();
    res.render("chats.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
    let{from,msg,to}=req.body;
    let newChat=new chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    });
    console.log(newChat);
    newChat.save().then((res)=>{
        console.log("chat saved");
    })
    .catch((err)=>{
        console.log("error");
        
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let newData=await chat.findById(id);
    console.log(newData);
    res.render("edit.ejs",{newData});
});
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let{msg:nMsg}=req.body;
    console.log(nMsg);
    let neDa= await chat.findByIdAndUpdate(
        id,
        {msg:nMsg},
        {runValidators:true , new:true}
    );
    console.log("success update");
    res.redirect("/chats");
});
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let deleted= await chat.findByIdAndDelete(id);
    console.log("delete success");
    res.redirect("/chats");
});