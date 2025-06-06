import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TaskList from "./components/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";
import EditTaskModal from "./components/EditTaskModal.jsx";
import './App.css';

/*
const initialTasks = [
    { id:1, title: "Ir de compras", dueDate: "Vence hoy", completed: false },
    { id:2, title: "Regreso de libro en biblioteca", dueDate: "Vence mañana", completed: false },
    { id:3, title: "Recibos", dueDate: "Vence en 2 días", completed: false },
    { id:4, title: "Plan de vacacion", dueDate: "Vence en 4 días", completed: false },
    { id:5, title: "Renovar suscripcion", dueDate: "Vence mañana", completed: false },
];
*/

function App() {
    // State to manage tasks
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks_v1');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }else {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem('tasks_v1', JSON.stringify(tasks));
    }, [tasks]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    // Handlers for modal and task operations
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    // Handlers for editing tasks modal
    const handleOpenEditModal = (task) => setEditingTask(task);
    const handleCloseEditModal = () => setEditingTask(null);

    const handleAddTask = (newTask) => {
        setTasks(prevTask => [newTask, ...prevTask]);
    }
    const handleToggleTask = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId) {
                    return {...task, completed: !task.completed};
                }
                return task;
            })
        );
    };
    const handleDeleteTask = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.filter(task => task.id !== taskId)
        );
    };

    const handleUpdateTask = (taskId, updatedData) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, ...updatedData } : task
            )
        );
        handleCloseEditModal(); // Cerramos el modal después de actualizar
    };

    return (
        <div className="app-container">
            <Sidebar/>
            <TaskList
                tasks={tasks}
                onAddTaskClick={handleOpenModal}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleOpenEditModal}
            />
            {isModalOpen &&
                <AddTaskModal onClose={handleCloseModal} onAddTask={handleAddTask} />}
            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={handleCloseEditModal}
                    onUpdateTask={handleUpdateTask}
                />
            )}
        </div>
    );
}

export default App;
