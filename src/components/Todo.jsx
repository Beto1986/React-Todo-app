const Todo = ({ item, eliminarTodo, editarTodo }) => {
  const { id, nombre, descripcion, estado, prioridad } = item;

  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-start mb-2">
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {/* Si es true se finaliza, caso contrario es pendiente  */}
            {nombre} ({estado ? "Finalizado" : "Pendiente"})
          </div>
          <p>{descripcion}</p>
        </div>
        <div>
          <button
            className="btn btn-danger me-2"
            onClick={() => eliminarTodo(id)}
          >
            Eliminar
          </button>
          <button className="btn btn-warning" onClick={() => editarTodo(id)}>
            Editar
          </button>
        </div>
        <span className="badge bg-primary rounded-pill">
          {/* Si existe prioridad o es verdadero */}
          {prioridad && "Prioritario"}
        </span>
      </li>
    </div>
  );
};

export default Todo;
