//Aca selecciono el rat: RAT1, RAT2, RAT3...
import { React, useState, useEffect } from "react";
import QuizSelectorCard from "../components/quiz/quizSelectorCard";

function QuizSelectorPage() {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setQuiz(json);
  };

  useEffect(() => {
    quizFetch();
    setIsLoading(false);
  }, []);

  return (
    <>
      <h1>Seleccionar quiz:</h1>
      {isLoading && <span>Loading... </span>}
      {quiz.map((quiz) => (
        <QuizSelectorCard quiz={quiz} />
      ))}
    </>
  );
}

export default QuizSelectorPage;
