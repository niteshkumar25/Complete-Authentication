const Notes = require('../models/notesmodel');


const notesCtrl = {
    getNotes: async(req,res)=>{
        try {
            const notes = await Notes.find({user_id:req.user.id})
            res.json(notes);
        } catch (err) {
            return res.status(500).json({msg:mesage})
            
        }
    },

    creteNotes: async(req,res)=>{
        try {
            const {title, content, date} = req.body;
            const newNotes = await new Notes({
                title,
                content,
                date,
                user_id:req.user.id,
                name:req.user.name
            })
            await newNotes.save()
            res.json({msg: "Data Send"})
            
        } catch (err) {

            return res.status(500).json({msg:err.mesage})
        }

    },
    deleteNotes: async(req,res)=>{
        try {
            await Notes.findByIdAndDelete(req.params._id);
            res.json({msg:"delete"})
            
        } catch (err) {

             return res.status(500).json({msg:err.mesage})
        }

    },
    updateNotes: async(req,res)=>{
        try {
            const {title, content, date} = req.body;
            await Notes.findOneAndUpdate({_id:req.params.id},{
                title,
                content,
                date
            })
            res.json({msg:"Update Notes"})
        } catch (err) {
            return res.status(500).json({msg:err.mesage})
            
        }
    },

    getNote: async(req,res)=>{
        try {
            const note = await Notes.findById(req.params.id);
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg:err.mesage})
            
        }
    }}

module.exports = notesCtrl;