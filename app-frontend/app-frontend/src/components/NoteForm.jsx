import { useEffect, useState } from "react";
import {
    FiSave,
    FiTrash2,
    FiEdit3,
    FiFileText
} from "react-icons/fi";

function NoteForm({
    selectedNote,
    isCreating,
    onCreate,
    onUpdate,
    onDelete
}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        if (selectedNote) {

            setTitle(selectedNote.title);
            setContent(selectedNote.content);

        } else {

            setTitle("");
            setContent("");

        }

    }, [selectedNote]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        if (selectedNote) {

            await onUpdate({
                id: selectedNote.id,
                title,
                content
            });

        } else {

            await onCreate({
                title,
                content
            });

            setTitle("");
            setContent("");

        }

    };

    const handleDelete = async () => {

        if (!selectedNote) return;

        if (window.confirm("Delete this note?")) {

            await onDelete(selectedNote.id);

            setTitle("");
            setContent("");

        }

    };

    if (!selectedNote && !isCreating) {

    return (

        <div className="welcome-screen">

            <h1>📝 Notes</h1>

            <p>
                Select a note from the left or click
                <strong> New Note </strong>
                to start writing.
            </p>

        </div>

    );

}

    return (

        <div className="editor-container">

            <div className="editor-header">

                <div className="editor-title">

                    <FiFileText />

                    <h2>

                        {selectedNote
                            ? "Edit Note"
                            : "New Note"}

                    </h2>

                </div>

                <span className="save-status">

                    ✓ Ready

                </span>

            </div>

            <form
                className="note-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Give your note a title..."
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Start writing..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                <div className="editor-footer">

                    <div className="character-count">

                        {content.length} characters

                    </div>

                    <div className="button-group">

                        <button
                            className="save-btn"
                            type="submit"
                        >

                            <FiSave />

                            {selectedNote
                                ? "Update"
                                : "Save"}

                        </button>

                        {selectedNote && (

                            <button
                                type="button"
                                className="delete-btn"
                                onClick={handleDelete}
                            >

                                <FiTrash2 />

                                Delete

                            </button>

                        )}

                    </div>

                </div>

            </form>

        </div>

    );

}

export default NoteForm;