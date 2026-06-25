function NoteList({ notes, onDelete }) {

    return (
        <div className="notes-container">

            {notes.map((note) => (
                <div
                    key={note.id}
                    className="note-card"
                >
                    <h3>{note.title}</h3>

                    <p>{note.content}</p>

                    <button
                        onClick={() =>
                            onDelete(note.id)
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}

        </div>
    );
}

export default NoteList;