import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const TodoApp = () => {
    let [todos, setTodos] = useState([
        { item: 'cooking', status: 'complete' },
        { item: 'Eating', status: 'incomplete' },
    ]);
    useEffect(() => {
        getTodos();
    }, []);
    const getTodos = () => {
        axios
            .get('/todos')
            .then((res) => setTodos(res.data))
            .catch((error) => {
                console.log(error);
            });
    };
    const addTodo = (event) => {
        event.preventDefault();
        let todoObject = {
            item: event.target.item.value,
            status: event.target.status.value,
        };
        axios
            .post('/todos', todoObject)
            .then((res) => {
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteTodo = (indexToDel) => {
        axios
            .delete('/todos/' + indexToDel)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getTodos();
    };

    return (
        <div className='todoappclass'>
            <h1>Todo app with express and mongo</h1>
            <form onSubmit={addTodo}>
                <input type='text' name='item' />
                <select name='status'>
                    <option value='complete'>complete</option>
                    <option value='incomplete'>incomplete</option>
                </select>
                <button>Add</button>
            </form>
            {todos.map((val, index) => {
                return (
                    <div className='border'>
                        status : {val.status} <br />
                        Todo : {val.item}
                        <button
                            onClick={() => {
                                deleteTodo(`${val._id}`);
                            }}
                        >
                            Delete this todo
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default TodoApp;
