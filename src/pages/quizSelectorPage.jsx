import React, { useState, useEffect } from "react";
import QuizCard from "../components/quiz/quizCard";

function QuizSelectorPage() {
  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const quizFetch = async () => {
    try {
      const URL = `http://localhost:3000/Quizes`;
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Error al traer la información");
      const json = await res.json();
      setQuiz(json);
      setIsLoading(false); // mover después de setQuiz
    } catch (error) {
      console.error("Error al cargar los quizzes:", error.message);
    }
  };

  useEffect(() => {
    quizFetch();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Seleccioná un cuestionario</h2>
      {isLoading && <span>Loading... </span>}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {quiz.map((q) => (
          <QuizCard key={q.id} quiz={q} />
        ))}
      </div>
    </div>
  );
}

export default QuizSelectorPage;
