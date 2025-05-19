import { useParams } from "react-router-dom";
import PreguntaMO from "./PreguntaMO";
import PreguntaTexto from "./PreguntaTexto";

function PreguntaWrapper({ data, setData }) {
  const { id, qid } = useParams();

  const cuestionario = obtenerCuestionario(id);
  const pregunta = cuestionario?.preguntas?.[qid];

  if (!pregunta) return <p>Pregunta no encontrada</p>; //A veces se buguea y no muestra nada xd

  return pregunta.tipo === "mo"
    ? <PreguntaMO data={data} setData={setData} />
    : <PreguntaTexto data={data} setData={setData} />;
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

export default PreguntaWrapper;
