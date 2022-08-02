
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

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


module.exports = router;

