import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    let {note, updateNote}= props;
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <Link to="/" onClick={()=>{deleteNote(note._id)}}>Delete</Link>
                    <Link className='mx-2' to="/" onClick={()=>{updateNote(note)}}>Edit</Link>
             
                </div>
            </div>     
        </div>
    )
}

export default NoteItems
