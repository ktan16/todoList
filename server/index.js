const express = require("express");
const app = express();
const port = 5000
const cors = require("cors");
const pool = require("./db") // allows for postgres queries

//middleware
app.use(cors());
app.use(express.json()); // req.body

// routes

// create todo
// sends a post request to /todos
app.post("/todos", async(req, res) => { // req contains info about incoming http request, response to send back to client
    try {
        // console.log(req.body); // json body
        const { description } = req.body;

        // insert a newTodo into todo table with (description) column where value = description from req.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", 
            [description]
        );
        res.json(newTodo.rows[0]); // response from client containing only data posted
    } catch (error) {
        console.error(error.message);
    }
});

// get all todos
// sends get request to get all todos from /todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.messge);
    }
});

// get a specific todo
app.get("/todos/:todo_id", async (req, res) => {
    try {
        const todo_id = req.params.todo_id;
        console.log(req.params)
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = ($1)",
            [todo_id]
        );

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// update a todo
app.put("/todos/:todo_id", async(req, res) => {
    try {
        const todo_id = req.params.todo_id;
        const { description } = req.body;

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, todo_id]
        );

        res.json(`Updated todo to '${description}'`);
    } catch (error) {
        console.log(error.message)
    }
});

// delete a todo
app.delete("/todos/:todo_id", async(req, res) => {
    try {
        const todo_id = req.params.todo_id;

        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [todo_id]
        );

        res.json("Deleted a todo");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`server has started on port ${port}`)
});