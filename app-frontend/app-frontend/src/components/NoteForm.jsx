import { useState } from "react";

function NoteForm({ onAddNote }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        onAddNote({
            title,
            content
        });

        setTitle("");
        setContent("");
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <textarea
                placeholder="Write your note..."
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
            />

            <button type="submit">
                Save Note
            </button>

        </form>
    );
}

export default NoteForm;