const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {UserRoute}=require("./route/userroute")
const {PostRoute}=require("./route/postroute")
const {auth}=require("./middlewear/auth")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users",UserRoute)
app.use(auth)
app.use("/posts",PostRoute)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongodb")
    }catch(err){
        console.log(err)
    }
    console.log(`server is working at port ${process.env.port}`)
})