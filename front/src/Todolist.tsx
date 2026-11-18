import React, { ChangeEvent, useState } from 'react';
import { FilterValue } from './App';

type TodolistProps = {
    title: string
    tasks: Task[]
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
    filterForTask: (value: FilterValue) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}



export const Todolist = (props: TodolistProps) => {

    let [title, setTitle] = useState('')
    // let [checked, setChecked] = useState(false)

    // const changeTask = (e: any) => {
    //     setChecked(e.target.checked)
    // }

    const tasks = props.tasks.map((task: Task) => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)} />
            <span>{task.title}</span>
            <button onClick={() => { removeTaskHandler(task.id) }}>X</button>
        </li>
    ))

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    const onAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onAllClickHandler = () => props.filterForTask('all')
    const onActiveClickHandler = () => props.filterForTask('active')
    const onCompletedClickHandler = () => props.filterForTask('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                />
                <button onClick={onAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
