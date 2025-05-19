import React from "react";
import { Link } from "react-router-dom";

function QuizCard({ question }) {
  return (
    <>
      <div className="container">
        <Link to={`/question/${question.id}`}>{question.question_name}</Link>
      </div>
    </>
  );
}

export default QuizCard;
