const express=require("express")
const UserRoute=express.Router()
const {UserModel}=require("../model/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//registration
UserRoute.post("/register",async(req,res)=>{
    const {name,email,gender,pass,age,city,married}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user=new UserModel({name,email,gender,pass:hash,age,city,married})
            await user.save()
            res.status(200).send({"msg":"register successfully done!"})
        })
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

//login
UserRoute.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"login successfull","token":jwt.sign({"userID":user._id},"masai")})
                }else{
                    res.status(400).send("wrong credentials")
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})


module.exports={
    UserRoute
}