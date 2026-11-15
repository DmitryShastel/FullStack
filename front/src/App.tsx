import React from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {

const tasks1 = [
    {id:1, title: 'HTML&CSS', isDone: false},
    {id:2, title: 'JS', isDone: false},
    {id:3, title: 'React', isDone: false},
]

const tasks2 = [
    {id:1, title: 'JAVA', isDone: false},
    {id:2, title: 'Python', isDone: false},
    {id:3, title: 'C#', isDone: false},
]


    return (
        <div className="App">
            <Todolist 
                title='Front-end' 
                tasks={tasks1}/>
            <Todolist 
                title='Back-end' 
                tasks={tasks2}
            />
        </div>
    );
}

export default App;
