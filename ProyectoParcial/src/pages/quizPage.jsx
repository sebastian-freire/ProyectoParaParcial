import React from "react";
import { useUser } from "../context/userContext";

function QuizPage() {
  const { userValue } = useUser();
  console.log(userValue)
  return (
    <>
      <div>quizPage</div>
    </>
  );
}

export default QuizPage;
