//Crear pregunta para un quiz
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function CreateQuestion() {
  const { id_quiz } = useParams();
  const quizId = parseInt(id_quiz);

  const [quiz, setQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const answerText = useRef(null);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const quizFetch = async () => {
    const URL = `http://localhost:3000/Quizes/${quizId}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");

    const json = await res.json();
    setQuiz(json);
  };

  useEffect(() => {
    setIsLoading(true);
    quizFetch();
  }, []);

  const [selectedCheck, setSelectedCheck] = useState("Text");

  const handleCheckChange = (event) => {
    setSelectedCheck(event.target.value);
  };

  const addQuestion = async () => {
    const URL = `http://localhost:3000/Quizes_questions/${quizId}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");

    const quiz_questions = await res.json().questions;
    const newAnswerValue = answerText.current.value;

    try {
      const fetchResponse = await fetch(
        `http://localhost:3000/Quizes_questions/${quizId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...quiz_questions,
            newAnswerValue
          })
        }
      );

      if (!fetchResponse.ok) {
        throw new Error(
          `Error al guardar la respuesta: ${fetchResponse.statusText}`
        );
      }
    } catch (error) {
      console.error("Hubo un error al enviar la respuesta:", error);
    }
  };

  return (
    <>
      <h1>{quiz.name}</h1>
      <h4>Estas agregando una pregunta al quiz: {quizId}</h4>
      <Link to="/quiz_selector">Volver a Quiz Selector</Link>
      <Link to={`/quiz/${quizId}`}>Volver a Quiz {quizId}</Link>

      <textarea ref={answerText} />
      <ul>
        <li>
          <input
            id="1"
            type="radio"
            value="Text"
            checked={"Text" == selectedCheck}
            onChange={handleCheckChange}
          />
          <label htmlFor="1">Pregunta de Texto</label>
        </li>
        <li>
          <input
            id="2"
            type="radio"
            value="Multiple"
            checked={"Multiple" == selectedCheck}
            onChange={handleCheckChange}
          />
          <label htmlFor="2">Pregunta Multiple opción</label>
        </li>
      </ul>
      {selectedCheck == "Multiple" && (
        <>
          <input type="text" ref={option1} />
          <input type="text" ref={option2} />
          <input type="text" ref={option3} />
          <input type="text" ref={option4} />
        </>
      )}

      <button onClick={addQuestion}>Contestar</button>

      {!isLoading && <div className="app-container"></div>}
    </>
  );
}

export default CreateQuestion;
