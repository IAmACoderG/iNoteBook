import NoteContext from "./NoteContext";
import { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const { showAlert } = props
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //fatchAllNote
    const fatchAllNote = async () => {
        //Api Call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });
        const json = await response.json();
        // console.log(json)
        setNotes(json)
    };

    const addNote = async (title, discription, tag) => {
        //Api Call

        const response = await fetch(`${host}/api/notes/getdata`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, discription, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        console.log(note)
        setNotes(notes.concat(note))

    };
    //Delete note
    const deleteNote = async (id) => {
        //Api Call
        const url = (`${host}/api/notes/deletenote/:${id}`);
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },


        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        console.log("deleted noted" + id)
        const afterdel = notes.filter((note) => note._id !== id);
        setNotes(afterdel)
        showAlert("Deleted Note", "success")
    };
    //Edit note 
    const editNote = async (id, title, discription, tag) => {
        //Api Call
        const url = (`${host}/api/notes/updatenote/:${id}`);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, discription, tag })
        });
        const json = await response.json();
        console.log(json);
        const newNote = JSON.parse(JSON.stringify(notes))
        //logic to Edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].discription = discription;
                newNote[index].tag = tag;
                break;
            }

        }
        setNotes(newNote);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fatchAllNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;