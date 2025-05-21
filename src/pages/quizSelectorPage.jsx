//Aca selecciono el rat: RAT1, RAT2, RAT3...
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuizSelectorCard from "../components/quizSelectorCard";

function QuizSelectorPage() {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setQuiz(json);
    setIsLoading(false);
  };

  useEffect(() => {
    quizFetch();
  }, []);

  return (
    <>
      <h1>Seleccionar quiz:</h1>
      <Link to="/login">Cambiar usuario</Link>

      {isLoading && <span>Loading... </span>}

      {!isLoading && (
        <div className="app-container">
          {quiz.map((quiz) => (
            <QuizSelectorCard quiz={quiz} />
          ))}
        </div>
      )}
    </>
  );
}

export default QuizSelectorPage;
