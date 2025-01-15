const {Router}=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");

const userRouter=Router()

require("dotenv").config()
const privateKey= process.env.privateKey

userRouter.post("/signup", async (req, res) => {
    const {name, email, role, password} = req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            return res.status(400).json({ message: "User already registered"})
        }else{
            bcrypt.hash(password, 5, async (err, hash)=> {
                if (err){
                    return res.status(400).json({ message: "Something went wrong with password!" });
                }
                const userDetails= new userModel({name, email,role, password:hash})
                await userDetails.save()
                return res.status(200).json({message: "User register successfully"})
            });
        }
        
    } catch (error) {
        return res.status(400).json({message:"register failed", error});
    }
})


userRouter.post("/login", async (req, res) => {
    const {email, password}=req.body
    try {
        const user= await userModel.findOne({email})
        if (!user){
            return res.status(400).json({message:"User not found"})
        }else{
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({ userId:user._id, username:user.username }, privateKey)
                    return res.status(200).json({message:"user login successfully", token})
                }else{
                  return res.status(400).json({message:"wrong password"})
                }
            });
      }
        
    } catch (error) {
        return res.status(400).json({message:error})
    }
})

module.exports=userRouter