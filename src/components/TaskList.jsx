import './TaskList.css'

function TaskList({ tasks, onAddTaskClick }) {
    return (
        <section className="task-list-container">
            <div className="task-list-header">
                <h2>Mis tareas</h2>
                <button className="add-task-button" onClick={onAddTaskClick}>
                    Agregar una tarea <span className="arrow">→</span>
                </button>
            </div>

            <ul className="tasks-ul">
                {tasks.map(task => (
                <li key={task.id} className="task-item">
                    <input type="checkbox"/>
                    <div className="task-details">
                        <span className="task-title">{task.title}</span>
                        <span className="task-due-date">{task.dueDate}</span>
                    </div>
                </li>
                ))}
            </ul>

        </section>
    );
}

export default TaskList;