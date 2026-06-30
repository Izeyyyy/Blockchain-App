import { FiFileText } from "react-icons/fi";

function NoteList({
    notes,
    selectedNote,
    onSelect
}) {

    const formatDate = () => {

        return new Date().toLocaleDateString("en-US",{
            month:"short",
            day:"numeric"
        });

    };

    return (

        <div className="note-list">

            {notes.length===0 ? (

                <div className="empty-notes">

                    <div className="empty-icon">
                        📒
                    </div>

                    <h3>No Notes Yet</h3>

                    <p>
                        Click "New Note" to create your first note.
                    </p>

                </div>

            ) : (

                notes.map(note=>(

                    <div

                        key={note.id}

                        className={
                            selectedNote?.id===note.id
                            ? "note-item active"
                            : "note-item"
                        }

                        onClick={()=>onSelect(note)}

                    >

                        <div className="note-top">

                            <div className="note-avatar">

                                <div className="note-avatar">

                                    {note.title.charAt(0).toUpperCase()}

                                </div>

                            </div>

                            <div className="note-info">

                                <h3>{note.title}</h3>

                                <span>{formatDate()}</span>

                            </div>

                        </div>

                        <p>

                            {note.content.length>90
                                ? note.content.substring(0,90)+"..."
                                : note.content}

                        </p>

                    </div>

                ))

            )}

        </div>

    );

}

export default NoteList;