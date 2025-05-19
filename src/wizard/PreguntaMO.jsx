import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonAtras from "./BotonAtras";
import { ResultadoContext } from "./ResultadoContext";

function PreguntaMO({ data, setData }) {
  const { agregarRespuesta } = useContext(ResultadoContext);
  const [seleccion, setSeleccion] = useState("");
  const { id, qid } = useParams();
  const navigate = useNavigate();

  const cuestionario = obtenerCuestionario(id);
  const pregunta = cuestionario?.preguntas?.[qid];
  const opciones = ["A", "B", "C"];

  const handleRespuesta = () => {
    if (!seleccion) return alert("Debes seleccionar una opción");
    /*
    const nuevasRespuestas = [...data.respuestas, { preguntaId: `${id}-${qid}`, respuesta: seleccion }]; //Hago un nuevo array de respuestas que tiene las anteriores + la pregunta + subpregunta + respuesta actual
    setData({ ...data, respuestas: nuevasRespuestas }); //Copio toto el data y sobreescribo el campo respuestas
    */
   agregarRespuesta(`${id}-${qid}`, seleccion);
    navigate(`/wizard/resultados`);
  };

  return (
    <div>
      <h3>{pregunta.texto}</h3>
      {opciones.map((op, i) => (
        <div key={i}>
          <input
            type="radio"
            name="respuesta"
            value={op}
            onChange={(e) => setSeleccion(e.target.value)}
          />
          <label>{op}</label>
        </div>
      ))}
      <BotonAtras />
      <button onClick={handleRespuesta}>Contestar</button>
    </div>
  );
}


function obtenerCuestionario(id) {
  const cuestionarios = {
    1: {
      preguntas: [
        { texto: "Cuantas patas tiene?", tipo: "mo" },
        { texto: "Tiene cola?", tipo: "texto" },
      ],
    },
    2: {
      preguntas: [
        {texto: "Cuantas patas tiene?", tipo: "mo" },
        {texto: "Tiene cola?", tipo: "texto" },
      ],
    },
    3: {
      preguntas: [
        {texto: "Cuantas patas tiene?", tipo: "texto" },
        {texto: "Tiene cola?", tipo: "mo" },
      ],
    },
  };
  return cuestionarios[id];
}

export default PreguntaMO;
