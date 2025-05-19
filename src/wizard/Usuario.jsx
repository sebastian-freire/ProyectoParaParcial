import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ResultadoContext } from "./ResultadoContext"; 

function Usuario() {
  const navigate = useNavigate();
  const { usuario, setUsuario } = useContext(ResultadoContext);

  return (
    <div>
      <h2>Usuario</h2>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)} // se sobreescribe el contexto con el valor nuevo cada vez que se hace el input
      />
      <button onClick={() => navigate("/wizard/questions")}>Continuar</button>
    </div>
  );
}

export default Usuario;
