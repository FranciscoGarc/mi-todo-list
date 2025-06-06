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

const initialData = [
    {
        id: 1,
        name: 'Mis Tareas',
        tasks: [
            { id: 101, title: 'Finalizar proyecto de portafolio', dueDate: 'Vence hoy', completed: false },
            { id: 102, title: 'Llamar al cliente', dueDate: 'Vence mañana', completed: true },
        ],
    },
    {
        id: 2,
        name: 'Lista de compras',
        tasks: [
            { id: 201, title: 'Leche', dueDate: 'Vence hoy', completed: false },
            { id: 202, title: 'Pan', dueDate: 'Vence mañana', completed: false },
            { id: 203, title: 'Huevos', dueDate: 'Vence en 2 días', completed: false },
        ],
    },
];

function App() {
    const [lists, setLists] = useState(() => {
        const savedData = localStorage.getItem('todo_app_data_v2');
        return savedData ? JSON.parse(savedData) : initialData;
    });
    const [activeListId, setActiveListId] = useState(() => {
        const savedData = localStorage.getItem('todo_app_data_v2');
        return savedData ? JSON.parse(savedData)[0]?.id : 1;
    });
    useEffect(() => {
        localStorage.setItem('todo_app_data_v2', JSON.stringify(lists));
    }, [lists]);

    const activeList = lists.find(list => list.id === activeListId) || lists[0];
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const handleCloseEditModal = () => setEditingTask(null);
    const handleAddTask = (newTaskData) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === activeListId
                    ? { ...list, tasks: [newTaskData, ...list.tasks] }
                    : list
            )
        );
    };

    const handleUpdateTask = (taskId, updatedData) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === activeListId
                    ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? { ...task, ...updatedData } : task) }
                    : list
            )
        );
        handleCloseEditModal();
    };

    const handleToggleTask = (taskId) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === activeListId
                    ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task) }
                    : list
            )
        );
    };

    const handleDeleteTask = (taskId) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === activeListId
                    ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
                    : list
            )
        );
    };
    return (
        <div className="app-container">
            <Sidebar
                lists={lists}
                activeListId={activeListId}
                setActiveListId={setActiveListId}
            />
            <TaskList
                activeList={activeList}
                onAddTaskClick={() => setIsAddModalOpen(true)}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={(task) => setEditingTask(task)}
            />
            {isAddModalOpen &&
                <AddTaskModal
                    onClose={() => setIsAddModalOpen(false)}
                    onAddTask={handleAddTask}
                />}
            {editingTask &&
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onUpdateTask={handleUpdateTask}
                />}
        </div>
    );
}

export default App;
