import React from "react";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/userContext";

function TestQuestion({ id_entrante }) {
  const { user } = useUser();
  const [answer, setAnswer] = useState([]);

  const currentDate = new Date();

  const [fechaState, setFecha] = useState();
  //const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const answerFetch = async () => {
    const URL = `http://localhost:3000/Answers`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    //setAnswers(json);
    const filtrado = await json.filter((jsonRow) => {
      console.log(id_entrante);
      return jsonRow.id_question == id_entrante && jsonRow.user == user;
    });
    setIsLoading(false);
    setAnswer(filtrado);
  };

  useEffect(() => {
    setIsLoading(true);
    answerFetch();
  }, []);

  const answerInput = useRef(null);

  const answerQuestion = () => {
    const newAnswer = answerInput.current.value;
    setFecha(currentDate.toString());
    console.log(fechaState);
    console.log(currentDate);
    if (answer.length > 0) {
      console.log("entrada 1");
      console.log(answer.length > 0);
      return fetch(`http://localhost:3000/Answers/${answer[0].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: newAnswer, date: fechaState })
      });
    } else {
      console.log("entrada 2");
      console.log(answer.length > 0);
      const newAnswerPost = {
        id_question: id_entrante,
        user: user,
        answer: newAnswer,
        date: fechaState
      };

      console.log(newAnswerPost);

      return fetch(`http://localhost:3000/Answers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnswerPost)
      });
    }
  };

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <>
          {answer.length > 0 ? (
            <>
              <span>{fechaState}</span>
              <textarea ref={answerInput}>{answer[0].answer}</textarea>
            </>
          ) : (
            <textarea ref={answerInput}></textarea>
          )}
          <button onClick={answerQuestion}>Contestar</button>
        </>
      )}
    </>
  );
}

export default TestQuestion;
