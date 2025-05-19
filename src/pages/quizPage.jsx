//Aca selecciono la pregunta del rat: Pregunta1, pregunta2, pregunta3.
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import QuizCard from "../components/quiz/quizCard";

function QuizPage() {
  const { id_quiz } = useParams();
  const quizId = parseInt(id_quiz);

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
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    quizFetch();
    questionsFetch();
  }, []);
  return (
    <>
      <h1>{quiz.name}</h1>
      <h4>Estas viendo las preguntas del quiz: {quizId}</h4>
      <Link to="/quiz_selector">Volver a Quiz Selector</Link>

      {!isLoading && (
        <div className="app-container">
          {question.map((question) => (
            <QuizCard question={question} />
          ))}
        </div>
      )}
    </>
  );
}

export default QuizPage;
