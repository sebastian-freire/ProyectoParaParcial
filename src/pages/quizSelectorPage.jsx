import React, { useState, useEffect } from "react";
import QuizCard from "../components/quizSelector/quizSelectorCard";
import "./quizSelectorPage.css"
//import { useUser } from "../context/userContext"

function QuizSelectorPage() {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //const { userValue } = useUser() //Aca esta el valor que devuelve el contexto

  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    setIsLoading(false);
    const json = await res.json();
    setQuiz(json);
  };

  useEffect(() => {
    quizFetch();
  }, []);

  return (
    <>
      {isLoading && <span>Loading... </span>}
      {!isLoading && <div className="quiz-selector-container">
      <h1 className="quiz-selector-title">Categorias de Preguntas</h1></div>}
      {quiz.map((q) => (
        <QuizCard quiz={q} />
      ))}
    </>
  );
}

export default QuizSelectorPage;
