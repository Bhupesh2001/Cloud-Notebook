import React from 'react'
import noteContext from '../context/notes/NoteContext'
import { useContext, useEffect, useRef, useState } from 'react'
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


function Notes() {
    const context = useContext(noteContext)
    const nav = useNavigate();
    const { Notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"})
    const ref = useRef(null)
    const refClose = useRef(null)
    
    useEffect(() => {

        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
            nav("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        // console.log(note.id)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        // addNote(note.etitle, note.edescription, note.etag);
    }



    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    
    return (
        <>
            <AddNote />

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                                </div>

                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>

                {Notes.map((note) => {
                    return <NoteItems key={note._id} note={note} updateNote={updateNote} />
                })}

            </div>
        </>
    )
}

export default Notes
