import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import Question from "../components/question/question"

function QuestionPage() {
  const [question, setQuestion] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { userValue } = useUser();
  console.log(userValue)


  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes_questions`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    setIsLoading(false);
    const json = await res.json();
    setQuestion(json);
  };

  useEffect(() => {
    quizFetch();
  }, []);

  {
    console.log(question)
  }

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {question.map((q) => (
        <Question q={q}/>
      ))}
    </>
  );
}

export default QuestionPage