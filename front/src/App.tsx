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

    const removeTodolist = (todolistId: string) => {
        setTodolists(prev => prev.filter(todolist => todolist.id !== todolistId))
    }

    const addTask = (todolistId: string, taskTitle: string) => {
        const newTask = { id: v1(), title: taskTitle, isDone: false }
        setTasks(prev => ({
            ...prev,
            [todolistId]: [newTask, ...prev[todolistId]]
        }))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks(prev => ({
            ...prev,
            [todolistId]: prev[todolistId].map(task => task.id === taskId ? { ...task, isDone: isDone } : task)
        }))
    }


    return (
        <div className="App">

            {
                todolists.map((tl: TodolistType) => {

                    // let taskForTodolist = tasks[tl.id]
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks

                    const changeFilter = (value: FilterValue, todolistId: string) => {
                        setTodolists(prev => prev.map(todolist => todolist.id === todolistId ? { id: todolistId, title: todolist.title, filter: value } : todolist))
                    }

                    if (tl.filter === 'active') { tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false) }
                    if (tl.filter === 'completed') { tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true) }

                    return <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
