import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import Users from "../model/user.model.js"

export const ConfigDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("DB Connected.")
    } catch (error) {
        console.log(error)
    }
}

export const CheckAuth = async (req,res , next)=>{
   try {
      let token = req.headers.authorization;
      
      if(!token){
        return res.status(400).json({ok:false , msg:"Authorization Header is Missing"})
      }
     
        const response = jwt.verify(token , process.env.SECERT_KEY)
        const User = await Users.findOne({email:response.user_id})
        
        if(!response && !User){
            return res.status(401).json({ok:false , msg:"UnAuthorized"})
        }
        
        req.user = {"email":User.email , "UserName":User.username , "UserId":User._id}
        next()
      
      
   } catch (error) {
        console.log(error)
        checkError(res , error.name)
   }
}

function checkError(res , error_name){
    if (error_name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  } else if (error_name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  else{
    
    return res.status(500).json({error:"Unexpected Error"})
  }
}