import React from "react";
import { Link } from "react-router-dom";
import "./quizSelectorCard.css"; // Asegurate de importar los estilos

function QuizCard({ quiz }) {
  return (
    <div className="quiz-card">
      <Link to={`${quiz.id}`}>
        <h3 className="quiz-title">{quiz.name}</h3>
        <p className="quiz-description">{quiz.description}</p>
      </Link>
    </div>
  );
}

export default QuizCard;
