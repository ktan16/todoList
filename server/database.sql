CREATE DATABASE todolist;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description varchar(255)
);