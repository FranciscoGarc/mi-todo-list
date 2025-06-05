import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TaskList from "./components/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";
import './App.css';

const initialTasks = [
    { id:1, title: "Ir de compras", dueDate: "Vence hoy" },
    { id:2, title: "Regreso de libro en biblioteca", dueDate: "Vence mañana" },
    { id:3, title: "Recibos", dueDate: "Vence en 2 días" },
    { id:4, title: "Plan de vacacion", dueDate: "Vence en 4 días" },
    { id:5, title: "Renovar suscripcion", dueDate: "Vence mañana" }
];

function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddTask = (newTask) => {
        setTasks(prevTask => [newTask, ...prevTask]);
    }

    return (
        <div className="app-container">
            <Sidebar/>
            <TaskList tasks={tasks} onAddTaskClick={handleOpenModal} />
            {isModalOpen && <AddTaskModal onClose={handleCloseModal} onAddTask={handleAddTask} />}
        </div>
    );
}

export default App;
