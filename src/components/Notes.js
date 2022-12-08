import React, { useContext, useEffect, useRef, useState } from 'react'
import AddNote from './AddNote';
import NoteContext from './context/notes/NoteContext'
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const context = useContext(NoteContext)
    let navigate = useNavigate();
    const { notes, fatchAllNote, editNote } = context;
    const { showAlert } = props



    useEffect(() => {
        if (localStorage.getItem('token')) {
            fatchAllNote();
        }
        else {
            navigate("/Login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refCLose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", ediscription: "", etag: "" });

    const updateNote = (curentNote) => {
        ref.current.click();
        setNote({ id: curentNote._id, etitle: curentNote.title, ediscription: curentNote.discription, etag: curentNote.tag })

    }
    const handleOnClick = () => {
        console.log("updating your notes....", note)
        editNote(note.id, note.etitle, note.ediscription, note.etag);
        refCLose.current.click();
        showAlert("note updates", "success")
    };
    const onChangeData = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    };

    return (
        <>
            <AddNote showAlert={showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3 ">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChangeData} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ediscription" className="form-label">Discription</label>
                                        <input type="text" className="form-control" id="ediscription" name='ediscription' value={note.ediscription} onChange={onChangeData} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChangeData} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refCLose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleOnClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-3 ">
                <h3>your Notes</h3>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
