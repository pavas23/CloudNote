import {useContext} from "react";
import NoteContext from "../context/notes/NoteContext.jsx"

export default function Noteitem(props) {
    const context = useContext(NoteContext);
    const deleteNote = context.deleteNote;
    const { note,updateNote } = props;
    function handledelete(){
        deleteNote(note._id);
        props.showAlert("Note deleted successfully","success");
    }
    function handleupdate(){
        updateNote(note);
    }
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash-can mx-2" onClick={handledelete}></i>
            <i className="fa-solid fa-file-pen" onClick= {handleupdate}></i>
          </div>
        </div>
      </div>
    </>
  );
}
