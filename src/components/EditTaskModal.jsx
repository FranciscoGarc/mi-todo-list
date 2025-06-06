import { useState } from "react";
import './EditTaskModal.css';

function EditTaskModal({ task, onClose, onUpdateTask }) {
    const [title, setTitle] = useState(task.title);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateTask(task.id, { title });
    }
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Nueva tarea</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Titulo</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="submit" className="submit-button">Actualizar tarea</button>
                </form>
            </div>
        </div>
    );
}

export  default EditTaskModal;