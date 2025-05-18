import React from "react";
import { Link } from "react-router-dom";

function QuizSelectorCard({ quiz }) {
  return (
    <>
      <div className="container">
        <Link to={`/quiz/${quiz.id_quiz}`}>
          {quiz.name} : {quiz.description}
        </Link>
      </div>
    </>
  );
}

export default QuizSelectorCard;
