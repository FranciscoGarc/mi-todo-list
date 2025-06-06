import './TaskList.css'
import  TaskItem from './TaskItem.jsx'

function TaskList({ activeList, onAddTaskClick, onToggleTask, onDeleteTask, onEditTask}) {
    if (!activeList){
        return <div className="task-list-container">Selecciona una lista o crea una nueva</div>;
    }
    return (
        <section className="task-list-container">
            <div className="task-list-header">
                <h2>{activeList.name}</h2>
                <button className="add-task-button" onClick={onAddTaskClick}>
                    Agregar una tarea <span className="arrow">→</span>
                </button>
            </div>
            <ul className="tasks-ul">
                {activeList.tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleTask={onToggleTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                    />
                ))}
            </ul>
        </section>
    );
}

export default TaskList;