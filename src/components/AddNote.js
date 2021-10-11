import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleAddNoteClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 className="my-2">Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            value={note.title}
            minLength={5}
            required
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={note.description}
            minLength={5}
            required
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            value={note.tag}
            required
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNoteClick}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
