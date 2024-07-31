import { useState, useRef, useEffect, useReducer } from 'react';
import { FaTrash } from 'react-icons/fa';
import { db } from './firebase/firebaseInit';

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.note, ...state];
    case "REMOVE":
      return state.filter((note, index) => index !== action.index);
    default:
      return [];
  }
}

function App() {

  const [formData, setFormData] = useState({ heading: "", content: "" });
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const headingRef = useRef();

  useEffect(() => {
    headingRef.current.focus();
  }, []);

  useEffect(() => {
    if (notes.length > 0 && notes[0].heading) {
      document.title = notes[0].heading;
    } else {
      document.title = "Notes App";
    }
  }, [notes]);

  function handleSubmit(event) {
    event.preventDefault();
    // setNotes([{ heading: formData.heading, content: formData.content }, ...notes]);
    dispatch({ type: "ADD", note: { heading: formData.heading, content: formData.content } });
    setFormData({ heading: "", content: "" });
    headingRef.current.focus();
  }

  function handleDelete(i) {
    dispatch({ type: "REMOVE", index: i });
    // setNotes(notes.filter((note, index) => index !== e));
  }

  return (
    <div className="app-container">
      <div className="note-container">
        <h1>Add Note</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={headingRef}
            maxLength="40"
            value={formData.heading}
            onChange={(e) => setFormData({ heading: e.target.value, content: formData.content })}
            placeholder="Heading"
          />
          <textarea
            rows="8"
            maxLength="65"
            value={formData.content}
            onChange={(e) => setFormData({ heading: formData.heading, content: e.target.value })}
            placeholder="Content"
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="notes-list">
        <h1>Notes</h1>
        {notes.map((note, i) => (
          <div className="notes-display" key={i}>
            <h3>{note.heading}</h3>
            <p>{note.content}</p>
            <button className="delete-btn" onClick={() => handleDelete(i)}><FaTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
