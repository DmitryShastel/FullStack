import React, { ChangeEvent, useState } from 'react';
import { FilterValue } from './App';

type TodolistProps = {
    title: string
    tasks: Task[]
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
    filterForTask: (value: FilterValue) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValue
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = (props: TodolistProps) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map((task: Task) => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)} />
            <span className={task.isDone === true ? 'is-done' : ''}>{task.title}</span>
            <button onClick={() => { removeTaskHandler(task.id) }}>X</button>
        </li>
    ))

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    const onAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
                    className={error ? 'error' : ''}
                />
                <button onClick={onAddTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? "active-filter" : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
