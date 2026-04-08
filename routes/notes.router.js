import express from 'express'
import { CreateNotes, DeleteNotes, EditNote, GetNotes , GetSingleNote, PinNote } from '../controller/notes.controller.js'

const NotesRouter = express.Router()


NotesRouter.get("/" , GetNotes)
NotesRouter.get("/:id" , GetSingleNote)
NotesRouter.get("/pin/:id" , PinNote)
NotesRouter.post("/" , CreateNotes)
NotesRouter.delete("/:id" , DeleteNotes)
NotesRouter.put("/:id" , EditNote)


export default NotesRouter