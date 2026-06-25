import { useEffect, useState } from "react";
import "./App.css";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

import {
    getNotes,
    createNote,
    deleteNote
} from "./service/NoteService";

function App() {

    const [notes, setNotes] = useState([]);

    const loadNotes = async () => {
        try {
            const response = await getNotes();
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleAddNote = async (note) => {

        try {
            await createNote(note);
            loadNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {

        try {
            await deleteNote(id);
            loadNotes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="app">

            <h1>Notes App</h1>

            <NoteForm
                onAddNote={handleAddNote}
            />

            <NoteList
                notes={notes}
                onDelete={handleDelete}
            />

        </div>
    );
}

export default App;