import express from 'express'
import { Login, Profile, SignUp } from '../controller/auth.controller.js'
import { CheckAuth } from '../config/config.js'

const AuthRouter = express.Router()

AuthRouter.post("/register" , SignUp)
AuthRouter.post("/login" , Login)
AuthRouter.get("/profile" , CheckAuth , Profile)


export default AuthRouter
