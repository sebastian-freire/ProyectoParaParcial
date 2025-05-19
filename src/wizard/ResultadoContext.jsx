import { createContext, useState } from "react";

export const ResultadoContext = createContext();

export function ResultadoProvider({ children }) {
  const [usuario, setUsuario] = useState("");
  const [respuestas, setRespuestas] = useState([]);

  const agregarRespuesta = (preguntaId, respuesta) => {
    setRespuestas((prev) => [...prev, { preguntaId, respuesta }]);
  };

  return (
    <ResultadoContext.Provider value={{
      usuario,
      setUsuario,
      respuestas,
      agregarRespuesta
    }}>
      {children}
    </ResultadoContext.Provider>
  );
}
