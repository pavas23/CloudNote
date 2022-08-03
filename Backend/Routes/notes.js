
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../Models/User");

// this endpoint will fetch all notes GET:"/api/notes/fetchallnotes"
//Route1
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
});

//Route2 : add a new note using POST:/api/notes/addnote
router.post("/addnote", fetchuser, [

    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Description must be at least 5 characters long").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        const note = new Notes({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

});

//Route3: update an existing note PUT:/api/notes/updatenote. Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        console.log(req.params.id);
        const { title, description, tag } = req.body;
        const newNote = {}
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        // find the note to be updated and update it
        let note = await Notes.findById({ _id: req.params.id });
        if (!note) { return res.status(404).send("Note not found") };
        // to check if id of req matches with user id who created the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, { new: true });
        // new is used to create if any field didnt exist earlier
        res.json({note});

    } catch(err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

});

//Route4: for deleting a note : DELETE:/api/notes/deletenote .Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        const note = await Notes.findById({ _id: req.params.id });
        if (!note) { return res.status(404).send("Note not found") };
        // to check if id of req matches with user id who created the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        await Notes.deleteOne({_id:req.params.id});
        res.send("Note has been deleted");

    } catch(err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

});




module.exports = router;


