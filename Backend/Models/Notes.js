
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId, // will take id from user model
            ref:"user", // pass user model for ref.
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        tag:{
            type:String,
            default:"General"
        },
        date:{
            type:Date,
            default:Date.now,
        }
    }
)

module.exports  = mongoose.model("notes",notesSchema);