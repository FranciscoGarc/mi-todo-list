import React, { useState } from 'react';
import './AddListModal.css';

const AddListModal = ({ onAddList, onClose }) => {
    const [listName, setListName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (listName.trim()) {
            onAddList(listName);
            onClose();
        }
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Crear Nueva Lista</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="modal-input"
                        placeholder="Nombre de la lista"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        autoFocus
                    />
                    <div className="modal-actions">
                        <button type="button" className="button-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="button-save">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddListModal;