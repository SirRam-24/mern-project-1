import Users from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const SignUp  = async (req, res)=>{
   try {
      const {username , email , password} = req.body;
      if(!username || !email || !password){
          return res.status(400).json({ok:false , msg:"Provide Username , Email , Password"})
      }
      const User = await Users.findOne({email:email})

      if(User){
        return res.status(400).json({ok:false , msg:"User Already Exists"})
      }

      const hpw = await bcrypt.hash(password , 10)
      await Users.create({
        username:username, 
        email:email,
        password:hpw
      })

      return res.status(201).json({ok:true , msg:"User Created Successfully"})
   } catch (error) {
       console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})

   }
} 

export const Login = async (req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
          return res.status(400).json({ok:false , msg:"Provide  Email , Password"})
        }
        let User = await Users.findOne({email:email})
        if(User && await bcrypt.compare(password , User.password)){
            let token = jwt.sign({user_id:email} , process.env.SECERT_KEY , {expiresIn:"1h"})
            return res.status(200).json({ok:true , msg:"Token Created Successfully" , token:token})
        }
        return res.status(400).json({ok:false , msg:"Invalid Credentails"})
       
    } catch (error) {
      console.log(error)
      return res.status(500).json({ok:false , msg:"Server Error"})
        
    }
}

export const Profile = async (req,res)=>{
  try {
     const UserId = req.user.UserId;
     const user = await Users.findOne({_id:UserId})
     if(!user){
      return res.status(400).json({ok:false , msg:"User Not Found"})
     }
     return res.status(200).json({ok:true , msg:user})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok:false , msg:"Server Error"})
  }
}

