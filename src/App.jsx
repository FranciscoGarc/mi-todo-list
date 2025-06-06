import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TaskList from "./components/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal.jsx";
import EditTaskModal from "./components/EditTaskModal.jsx";
import AddListModal from "./components/AddListModal.jsx";
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
/*
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
];*/

function App() {
    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem('todoLists');
        if (savedLists) {
            return JSON.parse(savedLists);
        } else {
            return [
                { id: 1, name: 'Lista de Tareas Principal', tasks: [] }
            ];
        }
    });
    const [activeListId, setActiveListId] = useState(() => {
        const savedActiveListId = localStorage.getItem('activeListId');
        if (savedActiveListId) {
            return JSON.parse(savedActiveListId);
        } else if (lists.length > 0) {
            return lists[0].id;
        } else {
            return null;
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(lists));
        localStorage.setItem('activeListId', JSON.stringify(activeListId));
    }, [lists, activeListId]);
    const addList = (listName) => {
        const newList = {
            id: Date.now(),
            name: listName,
            tasks: []
        };
        setLists(prevLists => [...prevLists, newList]);
        setActiveListId(newList.id);
    };
    const editList = (listId, newName) => {
        setLists(prevLists =>
            prevLists.map(list => {
                if (list.id === listId) {
                    return { ...list, name: newName };
                }
                return list;
            })
        );
    };
    const deleteList = (listIdToDelete) => {
        const newLists = lists.filter(list => list.id !== listIdToDelete);
        setLists(newLists);
        if (activeListId === listIdToDelete) {
            setActiveListId(newLists.length > 0 ? newLists[0].id : null);
        }
    };

    const activeList = lists.find(list => list.id === activeListId);
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
                onOpenModal={() => setIsModalOpen(true)}
                activeListId={activeListId}
                setActiveListId={setActiveListId}
                editList={editList}
                deleteList={deleteList}
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
            {isModalOpen && (
                <AddListModal
                    onAddList={addList}
                    onClose={() => setIsModalOpen(false)}
                />)}
        </div>
    );
}

export default App;
