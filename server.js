import express from 'express'
import { CheckAuth, ConfigDB } from './config/config.js'
import NotesRouter from './routes/notes.router.js'
import AuthRouter from './routes/auth.router.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(express.json())

app.use(cors())
app.use("/api/v1/notes" , CheckAuth ,  NotesRouter)
app.use("/api/v1/auth" , AuthRouter)


app.listen(PORT , ()=>{
    dotenv.config()
    ConfigDB()
    console.log("Server Running")
})