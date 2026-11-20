import React, { ChangeEvent, useState } from 'react';
import { FilterValue } from './App';

type TodolistProps = {
    id: string
    title: string
    tasks: Task[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, taskTitle: string) => void
    changeFilter: (value: FilterValue, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValue
    removeTodolist: (todolistId: string) => void
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
            <input type="checkbox" checked={task.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)} />
            <span className={task.isDone === true ? 'is-done' : ''}>{task.title}</span>
            <button onClick={() => { removeTaskHandler(task.id) }}>X</button>
        </li>
    ))

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.id, taskId)
    }

    const onAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.id, title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <div className="todolist-header">
                <h3>{props.title}</h3>
                <button onClick={() => { props.removeTodolist(props.id) }}>X</button>
            </div>
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
