import BotonAtras from "./BotonAtras";

function Resultados({ data }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Resumen de Resultados</h2>
      <p><strong>Usuario:</strong> {data.usuario}</p>

      <h3>Respuestas:</h3>
      <ul>
        {data.respuestas.length === 0 && <p>No se respondieron preguntas.</p>}
        {data.respuestas.map((r, i) => (
          <li key={i}>
            <strong>Pregunta ID:</strong> {r.preguntaId} <br />
            <strong>Respuesta:</strong> {r.respuesta}
          </li>
        ))}
      </ul>
        <BotonAtras />
      <button onClick={() => alert("Datos enviados correctamente")}>
        Enviar al servidor
      </button>
    </div>
  );
}

export default Resultados;
