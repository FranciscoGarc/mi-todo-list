import './Sidebar.css'

function Sidebar() {
  return (
        <aside className="sidebar">
            <h2>Mis listas</h2>
            <ul className="sidebar-list">
                <li className="active">Mis tareas</li>
                <li>Lista de compras</li>
                <li>Proyectos de trabajo</li>
                <li>Metas personales</li>
            </ul>

            <button className="new-list-button">Nueva lista</button>
        </aside>
  );
}

export default Sidebar;