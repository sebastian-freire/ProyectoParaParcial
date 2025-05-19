import MultipleQuestion from "./multipleQuestion";

function QuestionCard({ question }) {
  const multiple = question.type === "multiple_choice";
  return (
    <>
      <div className="container">
        <h2>{question.question_name}</h2>
      </div>
      {multiple && <MultipleQuestion options={question.options} />}
      {!multiple && <input type="text" />}
      <button>Conterstar</button>
    </>
  );
}

export default QuestionCard;
