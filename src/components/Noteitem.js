import React, { useContext } from 'react'
import NoteContext from './context/notes/NoteContext';


const Noteitem = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card ">
                <div className="card-body">
                    <h5 className="card-title text-center">{note.title}</h5>
                    <p className="card-text text-center">{note.discription}</p>
                    <div className="d-flex justify-content-around">
                        <i className="fa-sharp fa-solid fa-trash" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-file-pen" onClick={() => updateNote(note)}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
