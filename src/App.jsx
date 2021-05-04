import React, {Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";

const KEY = "todoApp.todos";

export function App() {
  const [todos, setTodos] = useState([{id:1, task: 'Tarea 1', completed: false}]);

  const todoTaskRef = useRef();
  const todoID = useRef();
  const todoCompleted = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY  , JSON.stringify(todos));
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleTodoAdd = () => {
    const id = todoID.current.value;
    const task = todoTaskRef.current.value;
    if ((task === '') || (id === '')) return;

    setTodos((prevTodos) => {
      return[...prevTodos, {id, task, completed: false}];
    });

    todoTaskRef.current.value = null;
    todoID.current.value += 1;
  }


  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }


    return (
      <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoID} type="text" placeholder="ID" />
        <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
        <button onClick={handleTodoAdd}><span role="img" aria-label="Añadir">➕</span></button>
        <button onClick={handleClearAll}><span role="img" aria-label="Eliminar">🗑</span></button>
        <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
      </Fragment>
    );
}
