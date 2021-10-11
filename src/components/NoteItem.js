import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 mx-2">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fas fa-trash-alt mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fas fa-edit mx-3 "
            onClick={() => {
              updateNote(note);
            }}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </div>
    </div>
  );
}
