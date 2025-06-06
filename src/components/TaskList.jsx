import './TaskList.css'
import  TaskItem from './TaskItem'

function TaskList({ tasks, onAddTaskClick, onToggleTask}) {
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
                    <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} />
                ))}
            </ul>
        </section>
    );
}

export default TaskList;