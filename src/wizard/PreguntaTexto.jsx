import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BotonAtras from "./BotonAtras";

function PreguntaTexto({ data, setData }) {
  const { id, qid } = useParams();
  const navigate = useNavigate();
  const [respuesta, setRespuesta] = useState("");

  const cuestionario = obtenerCuestionario(id);
  const pregunta = cuestionario?.preguntas?.[qid];

  const handleSubmit = () => {
    const nuevasRespuestas = [...data.respuestas, { preguntaId: `${id}-${qid}`, respuesta }];
    setData({ ...data, respuestas: nuevasRespuestas });
    navigate(`/wizard/resultados`);
  };

  return (
    <div>
      <h3>{pregunta.texto}</h3>
      <textarea value={respuesta} onChange={(e) => setRespuesta(e.target.value)} />
      <BotonAtras />
      <button onClick={handleSubmit}>Contestar</button>
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

export default PreguntaTexto;
