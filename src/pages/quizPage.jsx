//Aca selecciono la pregunta del rat: Pregunta1, pregunta2, pregunta3.
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuizCard from "../components/quiz/quizCard";

function QuizPage() {
  const { id } = useParams();
  const quizId = parseInt(id);

  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes/${quizId}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");

    const json = await res.json();
    setQuiz(json);
  };

  const questionsFetch = async () => {
    const URL = `http://localhost:3000/Quizes_questions/${quizId}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setQuestion(json.questions);
  };

  useEffect(() => {
    quizFetch();
    questionsFetch();
    setIsLoading(false);
  }, []);
  return (
    <>
      <h1>Estas viendo las preguntas del quiz: {quizId}</h1>
      {isLoading && <span>Loading...</span>}
      <h1>{quiz.name}</h1>
      {question.map((question) => (
        <QuizCard question={question} />
      ))}
    </>
  );
}

export default QuizPage;
