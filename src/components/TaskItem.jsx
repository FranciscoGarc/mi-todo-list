function TaskItem({ task, onToggleTask, onDeleteTask, onEditTask }) {
    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
            />
            <div className="task-details" onClick={() => onEditTask(task)}>
                <span className="task-title">{task.title}</span>
                <span className="task-due-date">{task.dueDate}</span>
            </div>
            <button
                className="delete-button"
                onClick={() => onDeleteTask(task.id)}
            >
                &times;
            </button>
        </li>
    );
}

export  default TaskItem;