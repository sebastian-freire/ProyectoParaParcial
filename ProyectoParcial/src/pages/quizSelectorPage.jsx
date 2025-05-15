import React, { useState, useEffect } from "react";
import QuizCard from "../components/quiz/quizCard";

function QuizSelectorPage() {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  {
    console.log("Quiz Selector");
  }
  return (
    <>
      {isLoading && <span>Loading... </span>}
      {quiz.map((q) => {
        <QuizCard quiz={q} />;
      })}
    </>
  );
}

export default QuizSelectorPage;
