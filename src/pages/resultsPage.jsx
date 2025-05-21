import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";

import { useTheme } from "../context/themeContext"

function ResultsPage() {
  const { user } = useUser();
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { darkMode } = useTheme()

  //Devuelve todas las respuestas del usuario
  const answerFetch = async () => {
    const URL = `http://localhost:3000/Answers?user=${user}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setIsLoading(false);
    setResults(json);
    console.log(json);
  };

  const questionFetch = async () => {
    const ids = results.map((r) => r.id_question);
    const fetches = ids.map((id) =>
      fetch(`http://localhost:3000/Question?id=${id}`).then((res) => res.json())
    );
    const responses = await Promise.all(fetches);
    const flatQuestions = responses.flat(); // Porque cada respuesta es un array
    setQuestions(flatQuestions);
    console.log(flatQuestions);
  };

  useEffect(() => {
    setIsLoading(true);
    answerFetch();
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      questionFetch();
    }
  }, [results]);

  return (
    <>
      <div className={ darkMode ? "dark-mode" : "light-mode"}>
        {isLoading && <span>Loading...</span>}
        {!isLoading && results && results.length > 0 ? (
          <>
            <h1>Resultados</h1>
            <ul>
              {results.map((result) => {
                const question = questions.find(
                  (q) => q.id == result.id_question
                );

                return (
                  <li key={result.id}>
                    <p>Pregunta: {question?.question_name || "Desconocida"}</p>
                    <p>Tipo: {question?.type || "Desconocido"}</p>
                    <p>Respuesta: {result.answer}</p>
                    <p>Fecha: {result.date}</p>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div style={{ color: "grey" }}>
            El usuario "{user}" no ha respondido ningun cuestionario aún.{" "}
          </div>
        )}
        <br />
        <Link to="/quiz_selector">Volver</Link>
      </div>
    </>
  );
}

export default ResultsPage;
