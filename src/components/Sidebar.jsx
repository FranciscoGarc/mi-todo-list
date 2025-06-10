import './Sidebar.css'
import React, { useState } from 'react';
import { PencilSimple, Trash } from '@phosphor-icons/react';

const Sidebar = ({ lists, onOpenModal, activeListId, setActiveListId, editList, deleteList }) => {
    const [editingListId, setEditingListId] = useState(null);
    const [newListName, setNewListName] = useState('');

    const handleEditClick = (list) => {
        setEditingListId(list.id);
        setNewListName(list.name);
    };
    const handleSaveEdit = (listId) => {
        if (newListName.trim()) {
            editList(listId, newListName);
        }
        setEditingListId(null);
    };
    const handleDeleteClick = (e, listId) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que quieres borrar esta lista?')) {
            deleteList(listId);
        }
    };
    return (
        <aside className="sidebar">
            <h2>Mis listas</h2>
            <ul className="sidebar-list">
                {lists.map(list => (
                    <li
                        key={list.id}
                        className={`list-item ${list.id === activeListId ? 'active' : ''}`}
                        onClick={() => editingListId !== list.id && setActiveListId(list.id)}
                    >
                        {editingListId === list.id ? (
                            //Si estamos en modo edición, muestra un input
                            <input
                                type="text"
                                className="list-edit-input"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                onBlur={() => handleSaveEdit(list.id)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(list.id)}
                                autoFocus
                            />
                        ) : (
                            //Si no, muestra el nombre de la lista y los botones
                            <>
                                <span className="list-name">{list.name}</span>
                                <div className="list-item-actions">
                                    <button onClick={(e) => {e.stopPropagation(); handleEditClick(list)}} className="action-button">
                                        <PencilSimple size={18} />
                                    </button>
                                    <button onClick={(e) => handleDeleteClick(e, list.id)} className="action-button">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <button className="new-list-button" onClick={onOpenModal}>
                + Añadir nueva lista
            </button>
        </aside>
  );
};

export default Sidebar;