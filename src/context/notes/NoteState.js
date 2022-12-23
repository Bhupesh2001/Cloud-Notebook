import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [Notes, setNotes] = useState(notesInitial)

  // Get all Note
  const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify()
    });
    const json = await response.json();
    setNotes(json);
  }


  // Add Note
  const addNote = async (title, description, tag) => {
    // TODO API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    setNotes(Notes.concat(note))
    
  }

  // Delete a Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)

    const newNotes = Notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    
    // API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json)
    
    let newNotes = JSON.parse(JSON.stringify(Notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);

  }

  return (
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;