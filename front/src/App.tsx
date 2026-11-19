import React, { useState } from 'react';
import './App.css';
import { Task, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValue = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValue
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ])

    let [tasks, setTasks] = useState<Record<string, Task[]>>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: false },
            { id: v1(), title: 'React', isDone: false, },
        ],
        [todolistId2]: [
            { id: v1(), title: 'books', isDone: true },
            { id: v1(), title: 'food', isDone: false },
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks(prev => ({
            ...prev,
            [todolistId]: prev[todolistId].filter(task => task.id !== taskId)
        }))
    }

    const addTask = (taskTitle: string) => {
        // const newTask = { id: v1(), title: taskTitle, isDone: false }
        // setTasks(prev => [newTask, ...prev])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // setTasks(prev => prev.map(task => task.id === taskId ? { ...task, isDone: isDone } : task))
    }


    return (
        <div className="App">

            {
                todolists.map((tl: TodolistType) => {

                    let taskForTodolist = tasks[tl.id]

                    const changeFilter = (value: FilterValue, todolistId: string) => {
                        setTodolists(prev => prev.map(todolist => todolist.id === todolistId ? { id: todolistId, title: todolist.title, filter: value } : todolist))
                    }

                    // if (tl.filter === 'active') { taskForTodolist = tasks.filter(task => task.isDone === false) }
                    // if (tl.filter === 'completed') { taskForTodolist = tasks.filter(task => task.isDone === true) }

                    return <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
