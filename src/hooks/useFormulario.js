import { useState } from "react";

// Es un hook de formulario para remplazar los handleChange.
export const useFormulario = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (e) => {
    // Desestructuramos el e.target con sus propiedades
    const { name, value, type, checked } = e.target;
    // Las llaves van entre () porque estamos devolviendo un objeto
    setInputs((old) => ({
      ...old, // Se realiza una copia del objeto todo
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Para limpiar el formulario.
  const reset = () => {
    setInputs(initialState);
  };

  return [inputs, handleChange, reset];
};
