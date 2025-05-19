import React from "react";
import { Link } from "react-router-dom";

function QuizCard({ id_quiz, question }) {
  return (
    <>
      <div className="container">
        <Link to={`/quiz/${id_quiz}/question/${question.id}`}>
          {question.question_name}
        </Link>
      </div>
    </>
  );
}

export default QuizCard;
