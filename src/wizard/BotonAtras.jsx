import { useNavigate } from "react-router-dom";

function BotonAtras() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Atrás</button>;
}

export default BotonAtras;
