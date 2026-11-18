import React, { useState } from 'react';
import './App.css';
import { Task, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValue = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Task[]>(
        [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: false },
            { id: v1(), title: 'React', isDone: false, },
        ]
    )

    let [filter, setFilter] = useState<FilterValue>('all')

    const removeTask = (taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId))
        console.log(tasks)
    }

    const addTask = (taskTitle: string) => {
        const newTask = { id: v1(), title: taskTitle, isDone: false }
        setTasks(prev => [newTask, ...prev])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(prev => prev.map(task => task.id === taskId ? { ...task, isDone: isDone } : task))
    }

    let taskForTodolist = tasks
    if (filter === 'active') { taskForTodolist = tasks.filter(task => task.isDone === false) }
    if (filter === 'completed') { taskForTodolist = tasks.filter(task => task.isDone === true) }

    const filterForTask = (value: FilterValue) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title='Front-end'
                tasks={taskForTodolist}
                removeTask={removeTask}
                filterForTask={filterForTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
