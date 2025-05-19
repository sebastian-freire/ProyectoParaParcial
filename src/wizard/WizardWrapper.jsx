import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Usuario from "./Usuario";
import Questions from "./Questions";
import CuestionarioDetalle from "./CuestionarioDetalle";
import PreguntaWrapper from "./PreguntaWrapper";
import Resultados from "./Restulados";

/*
  Flujo del wizard

  Rutas:
  - /wizard/usuario   -- Pantalla de inicio con ingreso de nombre de usuario
  - /wizard/questions -- Lista de cuestionarios disponibles
  - /wizard/cuestionario/:id  -- Detalle del cuestionario con sus preguntas
  - /wizard/cuestionario/:id/pregunta/:qid  --Muestra la pregunta
  - /wizard/resultados   -- Muestra resumen de respuestas

  Estado global compartido (formData):
  {
    usuario: "nombre",
    respuestas: [
      { preguntaId: "1-0", respuesta: "B" },
      { preguntaId: "1-1", respuesta: "Texto libre" }
    ]
  }

   Todos los pasos usan useParams para acceder a los valores de la URL.
*/


function WizardWrapper() {
  const [formData, setFormData] = useState({
  usuario: "",
  respuestas: [],
});


  return (
    <Routes>
      <Route path="usuario" element={<Usuario data={formData} setData={setFormData} />} />
      <Route path="questions" element={<Questions data={formData} setData={setFormData} />} />
      <Route path="cuestionario/:id" element={<CuestionarioDetalle data={formData} setData={setFormData} />} />
      <Route path="cuestionario/:id/pregunta/:qid" element={<PreguntaWrapper data={formData} setData={setFormData} />} /*id es id del cuestionario, qid es id de la pregunta dentro del cuestionario. No se puede repetir id por eso le puse qid */ /> 
      <Route path="resultados" element={<Resultados data={formData} />} />
    </Routes>
  );
}

export default WizardWrapper;
