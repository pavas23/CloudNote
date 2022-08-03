import {useContext} from "react";
import NoteContext from "../context/notes/NoteContext.js"
import Noteitem from "./Noteitem.js";

export default function Notes(){
    const context = useContext(NoteContext);
    const{notes,setNotes} = context;

    return(
        <div className="row">
        <h1>Your notes</h1>
        {notes.map((note)=>{
            return <Noteitem key = {note._id} note = {note}/>
        })}
    </div>
    );
}

