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
  const [error, setError] = useState(null);

  const quizFetch = async () => {
    try {
      const URL = `http://localhost:3000/Quizes/${quizId}`;
      const res = await fetch(URL);
      const json = await res.json();
      setQuiz(json);
    } catch (err) {
      setError("No se pudo cargar el quiz. Intenta más tarde.");
    }
  };

  const questionsFetch = async () => {
    try {
      const URL = `http://localhost:3000/Quizes_questions/${quizId}`;
      const res = await fetch(URL);
      const json = await res.json();
      setQuestion(json.questions);
      setIsLoading(false);
    } catch (error) {
      setError("No se pudo cargar el quiz. Intenta más tarde.");
    }
    
  };

  useEffect(() => {
    setError(null); // Volver a setear el error a null cuando se renderiza el componente
    setIsLoading(true);
    quizFetch();
    questionsFetch();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <>
    
      <h1>{quiz.name}</h1>
      <h4>Estas viendo las preguntas del quiz: {quizId}</h4>
      <Link to="/quiz_selector">Volver a Quiz Selector</Link>
      
      {!isLoading && (
        <div className="app-container">
          {question.map((question) => (
            <QuizCard id_quiz={id_quiz} question={question} />
          ))}
          
        </div>
      )}
    </>
  );
}

export default QuizPage;
