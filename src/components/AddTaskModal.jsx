import { useState } from "react";
import './AddTaskModal.css'

function AddTaskModal({ onClose, onAddTask }) {
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim()){
            alert('Por favor, ingresa un título para la tarea.');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title,
            dueDate: `Vence ${new Date(dueDate).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit'})}`,
        };

        onAddTask(newTask);
        onClose();
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

                    <label htmlFor="notes">Agregar nota</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <label htmlFor="due-date">Fecha de vencimiento</label>
                    <input
                        type="date"
                        id="due-date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <button type="submit" className="submit-button">Agregar tarea</button>
                </form>
            </div>
        </div>
    );
}

export  default AddTaskModal;