const express = require('express');
const Notes = require('../models/Notes')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// Route 1: Get Notes  using : GET request
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);

})

// Route 2: Add a new Notes  using : POST "/api/notes/addnotes" . Login Required
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        // If there are errors return Bad request and the Answer
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) {
        return res.status(400).json({ errors: error.array() });
    }

})

// Route 3: Update an existing Notes  using : POST "/api/notes/updatenotes" . Login Required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    try {
        
    const {title,description,tag} = req.body;
    // Create newNote object

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};


    // Find the note to be updates
    let note = await Notes.findById(req.params.id);
    // If no Note Exist
    if(!note){return res.status(404).send("Not Found")}

    // Checking user is Original or Not
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})


// Route 4: Delete an existing Notes  using : POST "/api/notes/deletenotes" . Login Required
router.put('/deletenotes/:id', fetchuser, async (req, res) => {

    try {
        
    
    const {title,description,tag} = req.body;

    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    // If no Note Exist
    if(!note){return res.status(404).send("Not Found")}

    // Allow deletion if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id, {new:true})
    res.json({"Success":"Note has been deleted"});
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router