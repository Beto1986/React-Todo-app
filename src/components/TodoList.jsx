import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import Todo from "./Todo";

const TodoList = () => {
  // En este caso va a ser un array "todos(plural)" porque es una colección de tareas
  const [todos, setTodos] = useState([]);

  // Obtener items en el local storage la primera vez al cargar la página.
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  // Acá tenemos un array de dependencias por lo que cada cambio que se realiza se guarda.
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const agregarTodo = (todo) => {
    // console.log(todo);
    // En esta caso devolvemos un array con la info de la tarea anterior más la nueva tarea
    setTodos((old) => [...old, todo]);
  };

  const eliminarTodo = (id) => {
    // Eliminamos el item del id que coincida
    setTodos((old) => old.filter((item) => item.id !== id));
  };

  const editarTodo = (id) => {
    const editarTodos = todos.map((item) =>
      // Hacemos una copia del item y dependiendo su estado lo modificamos
      item.id === id ? { ...item, estado: !item.estado } : item
    );
    setTodos(editarTodos);
  };

  return (
    <>
      <Formulario agregarTodo={agregarTodo} />
      <ul className="list-group list-group-numbered mt-2">
        {/* Recorremos las tareas agregadas.Se colocan()despues de "=>" porque devolvemos cada tarea*/}
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            eliminarTodo={eliminarTodo}
            editarTodo={editarTodo}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
