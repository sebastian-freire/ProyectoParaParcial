import { useNavigate } from "react-router-dom";

function Usuario({ data, setData }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Usuario</h2>
      <input
        type="text"
        value={data.usuario}
        onChange={(e) => setData({ ...data, usuario: e.target.value })} //Crea una copia de data y sobreescribe el campo usuario con el valor nuevo. Se ejecuta cada vez que el usuario escribe algo
      />
      <button onClick={() => navigate("/wizard/Questions")}>Usuario</button>
    </div>
  );
}

export default Usuario;
