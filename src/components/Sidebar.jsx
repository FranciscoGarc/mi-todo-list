import './Sidebar.css'

function Sidebar({ lists, onOpenModal, activeListId, setActiveListId }) {
  return (
        <aside className="sidebar">
            <h2>Mis listas</h2>
            <ul className="sidebar-list">
                {lists.map(list => (
                    <li
                        key={list.id}
                        className={`list-item ${list.id === activeListId ? 'active' : ''}`}
                        onClick={() => setActiveListId(list.id)}
                    >
                        {list.name}
                    </li>
                ))}
            </ul>
            <button className="new-list-button" onClick={onOpenModal}>
                + Añadir nueva lista
            </button>
        </aside>
  );
}

export default Sidebar;