import { Notes } from "../model/notes.Model.js"

export const GetNotes = async (req,res) =>{
    try {
        
        const notes = await Notes.find({UserInfo:req.user})
        if(notes){
            return res.status(200).json({ok:true , notes:notes , msg:"Notes Listed Successfully"})
        }else{
            return res.status(404).json({ok:false , msg:"Notes Not Found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})
    }
}

export const GetSingleNote = async (req,res) =>{
    try {
        const {id} = req.params;
        const notes = await Notes.findOne({_id:id , UserInfo:req.user})

        if(notes){
            return res.status(200).json({ok:true , notes:notes })
        }else{
            return res.status(404).json({ok:false , msg:"Notes Not Found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})
    }
}

export const CreateNotes = async (req,res)=>{
    try {
        const {title , caption} = req.body;
        
        if(!title || !caption){
            return res.status(400).json({ok:false , msg:"Provide Both Title and Caption"})
        }
        
        await Notes.create({
            title:title,
            caption:caption,
            pinned:false,
            UserInfo:req.user
        })
        
        return res.status(201).json({ok:true  , msg:"Notes Created"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})
        
    }
}

export const DeleteNotes = async (req,res)=>{
    try {
       const {id} = req.params;
       const response = await Notes.findOne({_id:id , UserInfo:req.user})
       
       if(!response){
        return res.status(400).json({ok:false , msg:"Note Not Found"})
       }
       await Notes.findByIdAndDelete({_id:id , UserInfo:req.user})
       return res.status(200).json({ok:true  , msg:"Notes Deleted"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})
        
    }
}

export const EditNote = async (req,res)=>{
    try {
        const {title , caption} = req.body;
        const {id} = req.params;
        const response = await Notes.findOne({_id:id , UserInfo:req.user})
        if(!response){
            return res.status(400).json({ok:false , msg:"Note Not Found"})
        }
        await Notes.findByIdAndUpdate({_id:id , UserInfo:req.user} , {title:title , caption:caption})
        return res.status(201).json({ok:true  , msg:"Notes Updated !"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})

    }
}

export const PinNote = async (req,res)=>{
    try {
       const {id} = req.params;
       const Note = await Notes.findOne({_id:id , UserInfo:req.user})
       if(!Note){
        return res.status(404).json({ok:false , msg:"Note Not Found"})
       }
       await Notes.findByIdAndUpdate({_id:id , UserInfo:req.user} , {pinned:!Note.pinned})
       return res.status(200).json({ok:true , msg:"Note Pinned Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false , msg:"Server Error"})
    }
}