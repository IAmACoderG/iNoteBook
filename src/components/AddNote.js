import React, { useContext, useState } from 'react'
import NoteContext from './context/notes/NoteContext';

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const { addNote } = context;
    const {showAlert} = props
    const [note, setNote] = useState({ title: "", discription: "", tag: "" });

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.discription, note.tag)
        setNote({ title: "", discription: "", tag: "" })
        showAlert("note Added", "success")
    };
    const onChangeData = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    };
    return (
        <div className="container my-3 ">
            <h2 className='text-center'>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}onChange={onChangeData} />

                </div>
                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">Discription</label>
                    <input type="text" className="form-control" id="discription" name='discription' value={note.discription} onChange={onChangeData} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChangeData} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
