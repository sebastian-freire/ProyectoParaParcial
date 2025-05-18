//Aca selecciono la pregunta del rat: Pregunta1, pregunta2, pregunta3.
import React from "react";
import { useUser } from "../context/userContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function QuizPage() {
  const { userValue } = useUser();
  console.log(userValue);

  const { id_quiz } = useParams();
  const quizId = parseInt(id_quiz);

  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");

    const json = await res.json();
    setQuiz(json.find((q) => q.id_quiz === quizId));
  };

  const questionsFetch = async () => {
    const URL = `http://localhost:3000/Quizes_questions/${quizId}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setQuiz(json.find((q) => q.id_quiz === quizId));
  };

  useEffect(() => {
    quizFetch();
    questionsFetch();
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading && <span>Loading...</span>}
      <h1>Estas viendo las preguntas del quiz: {id_quiz}</h1>
      <h1>{quiz.name}</h1>
    </>
  );
}

export default QuizPage;
