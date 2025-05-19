import { useNavigate } from "react-router-dom";
import "./Questions.css";
import BotonAtras from "./BotonAtras";

function Questions({ data, setData }) {
  const navigate = useNavigate();

  const cuestionarios = [
  { id: 1, nombre: "Perros", descripcion: "Partes del cuerpo" },
  { id: 2, nombre: "Gatos", descripcion: "Partes del cuerpo" },
  { id: 3, nombre: "Humanos", descripcion: "Partes del cuerpo" },
];

  return (
    <div className="questions-container">
      <h2>Questions</h2>
      {cuestionarios.map((q, i) => (
        <div
          key={q.id}
          className={`cuestionario-card color-${i}`}
          onClick={() => navigate(`/wizard/cuestionario/${q.id}`)}
        >
          <strong>{q.nombre}</strong>: {q.descripcion}
        </div>
      ))}
      <BotonAtras />
    </div>
  );
}

export default Questions;
