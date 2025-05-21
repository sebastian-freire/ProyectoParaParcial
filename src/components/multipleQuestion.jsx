import React from "react";
import "./multipleQuestion.css";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

function MultipleQuestion({ id_entrante, options }) {
  const { user } = useUser();
  const [answer, setAnswer] = useState(null);
  const currentDate = new Date();
  const [isLoading, setIsLoading] = useState(true);
  console.log({ answer }); // FIXME

  const answerFetch = async () => {
    const URL = `http://localhost:3000/Answers?id_question=${id_entrante}&user=${user}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setIsLoading(false);
    setAnswer(json[0]);
    setSelectedCheck(json[0]?.answer);
  };

  useEffect(() => {
    setIsLoading(true);
    answerFetch();
  }, []);

  const answerQuestion = async () => {
    const newAnswerValue = selectedCheck;
    const dateString =
      currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
    try {
      let fetchResponse;
      if (answer) {
        fetchResponse = await fetch(
          `http://localhost:3000/Answers/${answer.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answer: newAnswerValue,
              date: dateString
            })
          }
        );
      } else {
        const newAnswerPost = {
          id_question: id_entrante,
          user: user,
          answer: newAnswerValue,
          date: dateString
        };

        fetchResponse = await fetch(`http://localhost:3000/Answers/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnswerPost)
        });

        if (!fetchResponse.ok) {
          throw new Error(
            `Error al guardar la respuesta: ${fetchResponse.statusText}`
          );
        }
      }
      answerFetch();
    } catch (error) {
      console.error("Hubo un error al enviar la respuesta:", error);
    }
  };

  const [selectedCheck, setSelectedCheck] = useState(null);

  const handleCheckChange = (event) => {
    setSelectedCheck(event.target.value);
  };

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <>
          <span>{answer?.date}</span>
          <ul>
            {options.map((option, index) => (
              <>
                <li>
                  <input
                    type="radio"
                    id={index}
                    name="grupoColores"
                    value={option}
                    checked={option == selectedCheck}
                    onChange={handleCheckChange}
                  />
                  <label htmlFor={index}>{option}</label>
                </li>
              </>
            ))}
          </ul>
        </>
      )}
      <button onClick={answerQuestion}>Contestar</button>
    </>
  );
}

export default MultipleQuestion;
