import React from "react";
import MultipleQuestion from "./multipleQuestion";
import TestQuestion from "./testQuestion";

function QuestionCard({ question }) {
  const multiple = question.type == "multiple_choice";

  return (
    <>
      <div className="container">
        <h2>{question.question_name}</h2>
      </div>
      {multiple && (
        <MultipleQuestion
          id_entrante={question.id}
          options={question.options}
        />
      )}
      {!multiple && <TestQuestion id_entrante={question.id} />}
      
    </>
  );
}

export default QuestionCard;
