import {useContext} from "react";
import NoteContext from "../context/notes/NoteContext.jsx"
import Noteitem from "./Noteitem.jsx";

export default function Notes(){
    const context = useContext(NoteContext);
    const{notes,addNote} = context;

    return(
        <div className="row">
        <h1>Your notes</h1>
        {notes.map((note)=>{
            return <Noteitem key = {note._id} note = {note}/>
        })}
    </div>
    );
}

