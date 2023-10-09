import React, {Fragment, useState, useEffect} from "react";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    // delete todo function
    const deleteTodo = async (id) => { // function that takes the parameter todo_id 
        try {
            // makes a delete 
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id != id)); // shows every other todo where id doesn't match
        } catch (error) {
            console.log(error.message)
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData  = await response.json();

            setTodos(jsonData)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>Edit</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;