import { useEffect, useMemo, useState } from "react";
import "./App.css";

import { FiSearch } from "react-icons/fi";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

import {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from "./service/NoteService";

function App(){

    const [notes,setNotes]=useState([]);
    const [selectedNote,setSelectedNote]=useState(null);
    const [search,setSearch]=useState("");
    const [isCreating, setIsCreating] = useState(false);

    const handleNewNote = () => {
        setSelectedNote(null);
        setIsCreating(true);
    };

    const loadNotes=async()=>{

        try{

            const response=await getNotes();

            setNotes(response.data);

            if(selectedNote){

                const updated=response.data.find(
                    note=>note.id===selectedNote.id
                );

                setSelectedNote(updated||null);

            }

        }
        catch(error){

            console.error(error);

        }

    };

    useEffect(()=>{

        loadNotes();

    },[]);

    const filteredNotes=useMemo(()=>{

        return notes.filter(note=>

            note.title
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            note.content
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    },[notes,search]);

    const handleCreate=async(note)=>{

        await createNote(note);

        loadNotes();

    };

    const handleUpdate=async(note)=>{

        await updateNote(note.id,note);

        loadNotes();

    };

    const handleDelete=async(id)=>{

        await deleteNote(id);

        setSelectedNote(null);

        loadNotes();

    };

    return(

        <div className="app">

            <aside className="sidebar">

                <div className="sidebar-header">

                    <div className="logo">

    <div className="logo-icon">
        📝
    </div>

    <div>

        <h2>My Notes</h2>

    </div>

</div>

                    <button
                        className="new-btn"
                        onClick={handleNewNote}
                    >
                        + New Note
                    </button>

                    <div className="search-box">

                        <FiSearch/>

                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>

                    <div className="note-count">

                        {filteredNotes.length} Notes

                    </div>

                </div>

                <NoteList

                    notes={filteredNotes}

                    selectedNote={selectedNote}

                    onSelect={(note) => {
                        setSelectedNote(note);
                        setIsCreating(false);
                    }}

                />

            </aside>

            <main className="editor">

                <NoteForm

                    selectedNote={selectedNote}
                    isCreating={isCreating}

                    onCreate={handleCreate}

                    onUpdate={handleUpdate}

                    onDelete={handleDelete}

                />

            </main>

        </div>

    );

}

export default App;