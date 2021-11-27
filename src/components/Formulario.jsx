// import { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useFormulario } from "../hooks/useFormulario";

const Formulario = ({ agregarTodo }) => {
  // Inicializamos por defecto los valores del formulario
  const initialState = {
    nombre: "",
    descripcion: "",
    estado: "pendiente",
    prioridad: false
  };

  //   // Creamos estado todo
  //   const [todo, setTodo] = useState(initialState);

  // Traemos el hook que recibe su estado inicial con el array que devolvía
  const [inputs, handleChange, reset] = useFormulario(initialState);

  // Desestructuramos el todo para asignar a cada "value". Es para evitar poner {todo.nombre}, {todo.descripcion}, y asi sucesivamente en cada value
  //   const { nombre, descripcion, estado, prioridad } = todo;
  const { nombre, descripcion, estado, prioridad } = inputs;

  //   const handleChange = (e) => {
  //     // Desestructuramos el e.target con sus propiedades
  //     const { name, value, type, checked } = e.target;
  //     // Las llaves van entre () porque estamos devolviendo un objeto
  //     setTodo((old) => ({
  //       ...old, // Se realiza una copia del objeto todo
  //       [name]: type === "checkbox" ? checked : value
  //     }));
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(todo); // los valores obtenidos del formulario
    // Valido que el nombre no este en blanco
    if (!nombre.trim()) {
      // Seteamos el foco en el nombre(primer elemento)
      e.target[0].focus();
      Swal.fire({
        title: "Error",
        text: "Debe ingresar un nombre",
        icon: "error"
      });
      return;
    }

    // Valido que la descripción no este en blanco
    if (!descripcion.trim()) {
      // Seteamos el foco en la descripción (segundo elemento)
      e.target[1].focus();
      Swal.fire({
        title: "Error",
        text: "Debe ingresar una descripción",
        icon: "error"
      });
      return;
    }

    // En caso de exito(si pasó las validaciones anteriores)
    Swal.fire({
      title: "Éxito",
      text: "Tarea agregada",
      icon: "success"
    });

    //
    agregarTodo({
      nombre: nombre,
      descripcion: descripcion,
      estado: estado === "pendiente" ? false : true,
      prioridad: prioridad,
      //   id: Date.now() // es una opcion, pero no la mejor
      id: uuidv4()
      //// Otra forma
      //   nombre,
      //   descripcion,
      //   estado,
      //   prioridad
    });

    // Resetear a valores originales.
    // setTodo(initialState);
    reset();
  };

  return (
    <>
      <h3>Agregar TODO</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          name="nombre"
          placeholder="Ingrese todo nombre"
          value={nombre}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Ingrese descripción"
          className="form-control mb-2"
          value={descripcion}
          onChange={handleChange}
        />
        <select
          name="estado"
          className="form-control mb-2"
          value={estado}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={prioridad}
            id="flexCheckDefault"
            name="prioridad"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Prioritario
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
    </>
  );
};

export default Formulario;
