import { useParams, useNavigate } from "react-router-dom";
import "./Questions.css";
import BotonAtras from "./BotonAtras";

function CuestionarioDetalle() {
  const { id } = useParams(); // ID del cuestionario desde la URL. Si se entra a /wizard/cuestionario/3, el useParams obtiene el 3. Sirve para saber donde estoy parado
  const navigate = useNavigate();

  // Simulación de cuestionarios con preguntas
  const cuestionarios = {
    1: {
      nombre: "Perros",
      descripcion: "Partes del cuerpo",
      preguntas: [
        { id: 0, texto: "Cuantas patas tiene?", tipo: "mo" },
        { id: 1, texto: "Tiene cola?", tipo: "texto" },
      ],
    },
    2: {
      nombre: "Gatos",
      descripcion: "Partes del cuerpo",
      preguntas: [
        { id: 0, texto: "Cuantas patas tiene?", tipo: "mo" },
        { id: 1, texto: "Tiene cola?", tipo: "texto" },
      ],
    },
    3: {
      nombre: "Humanos",
      descripcion: "Partes del cuerpo",
      preguntas: [
        { id: 0, texto: "Cuantas patas tiene?", tipo: "texto" },
        { id: 1, texto: "Tiene cola?", tipo: "mo" },
      ],
    },
  };

  const cuestionario = cuestionarios[id];

  if (!cuestionario) return <p>Cuestionario no encontrado</p>;

  return (
    <div className="questions-container">
      <h2>Questions</h2>
      <p>
        <strong>{cuestionario.nombre}</strong>: {cuestionario.descripcion}
      </p>

      {cuestionario.preguntas.map((pregunta, i) => (
        <div
          key={i}
          className={`cuestionario-card color-${i % 3}`} //Esto es para que los colores se repitan cada 3 elementos
          onClick={() => navigate(`/wizard/cuestionario/${id}/pregunta/${pregunta.id}`)}
        >
          {pregunta.texto}
        </div>
      ))}
      <BotonAtras />
    </div>
  );
}

export default CuestionarioDetalle;
