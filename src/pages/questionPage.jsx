//Aca selecciono la respuesta de la pregunta.
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionCard from "../components/quiz/questionCard";

function QuestionPage() {
  const { id } = useParams();
  const questionId = parseInt(id);

  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const questionsFetch = async () => {
    const URL = `http://localhost:3000/Question/${questionId}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setQuestion(json);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    questionsFetch();
  }, []);
  return (
    <>
      <h1>Pregunta {question.id}:</h1>
      <Link to="/quiz_selector">Volver a Quiz Selector</Link>
      {isLoading && <span>Loading...</span>}

      {!isLoading && (
        <div className="app-container">
          <QuestionCard question={question} />
        </div>
      )}
    </>
  );
}

export default QuestionPage;
