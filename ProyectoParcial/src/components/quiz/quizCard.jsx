import React from "react";
import { Link } from "react-router-dom";

function QuizCard({ quiz }) {
  return (
    <>
      <div className="container">
        <Link to={`${quiz.id}`}>
          {quiz.name} : {quiz.description}
        </Link>
      </div>
    </>
  );
}

export default QuizCard;
