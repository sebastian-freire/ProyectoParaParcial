import React from "react";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../context/userContext";

function TestQuestion({ id_entrante }) {
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
  };

  useEffect(() => {
    setIsLoading(true);
    answerFetch();
  }, []);

  const answerInput = useRef(null);

  const answerQuestion = async () => {
    const newAnswerValue = answerInput.current.value;
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

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <>
          <span>{answer?.date ?? ""}</span>
          <textarea ref={answerInput} defaultValue={answer?.answer ?? ""} />

          <button onClick={answerQuestion}>Contestar</button>
        </>
      )}
    </>
  );
}

export default TestQuestion;
