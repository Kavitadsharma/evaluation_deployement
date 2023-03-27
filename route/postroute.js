const express=require("express")
const PostRoute=express.Router()
const {PostModel}=require("../model/postmodel")
const jwt=require("jsonwebtoken")

//Get
PostRoute.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const post= await PostModel.find({"userID":decoded.userID})
            res.status(200).send(post)
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//post
PostRoute.post("/add",async(req,res)=>{
    try{
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"post has been created"})

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
//patch
PostRoute.patch("/update/:userid",async(req,res)=>{
    const userid=req.params.userid
    const payload=req.body
    try{
        const query=await PostModel.findByIdAndUpdate({_id:userid},payload)
        res.status(200).send({"msg":"post update succcessfully"})

    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

//delete
PostRoute.delete("/delete/:userid",async(req,res)=>{
    const userid=req.params.userid
    
    try{
        const query=await PostModel.findByIdAndDelete({_id:userid})
        res.status(200).send({"msg":"post deleted"})

    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

module.exports={
    PostRoute
}