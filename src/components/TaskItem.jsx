function TaskItem({task, onToggleTask}) {
    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
            />
            <div className="task-details">
                <span className="task-title">{task.title}</span>
                <span className="task-due-date">{task.dueDate}</span>
            </div>
        </li>
    );
}

export  default TaskItem;