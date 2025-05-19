import BotonAtras from "./BotonAtras";
import { ResultadoContext } from "./ResultadoContext";
import { useContext } from "react";

function Resultados({ data }) {
  const { usuario, respuestas } = useContext(ResultadoContext);
   return (
    <div>
      <h2>Resumen</h2>
      <p>Usuario: {usuario}</p>
      <ul>
        {respuestas.map((r, i) => (
          <li key={i}>{r.preguntaId}: {r.respuesta}</li>
        ))}
      </ul>
      <BotonAtras/>
    </div>
  );
}

export default Resultados;
