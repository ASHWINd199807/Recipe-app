import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js";

const router =express.Router()

router.post("/register",async(req,res)=>{
    const {username , password} = req.body
    const user = await UserModel.findOne({username}) // username:username

    if (user){
      return res.json({message:"User already exists."})
    }
    const hashedPassword = await bcrypt.hash(password , 10)
    const newUser = new UserModel({username , password:hashedPassword})// ( { username : username , password : "hashedPassword" } )
    await newUser.save() // saving the changes   

    res.json({message:"User Registered Successfully!"})
})

router.post("/login",async (req,res)=>{                                                                                                                                                                                                                                                                                       // after login the user needs to send the token to prove that they re the original users who sent request
    const {username , password} = req.body
    const user = await UserModel.findOne({username})

    if(!user){
        return res.json({message:"User Dosen't Exist"})
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)
    
    if (!isPasswordValid){
        return res.json({message:"Username or Password is Incorrect"})
    }

    const token = jwt.sign({id:user._id}, "secret") // id of the user , with "secret" key
    res.json( { token , userID : user._id } )
})    

export {router as userRouter}

export const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization
    if (token){
        jwt.verify(token,"secret",(err)=>{
            if (err) return res.sendStatus(403)
            next()
        })
    } else {
        res.sendStatus(401)
    }
}


  