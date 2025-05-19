import React from "react";
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/userContext";

function TestQuestion({ id_entrante }) {
  const { user } = useUser();
  const [answer, setAnswer] = useState([]);
  const currentDate = new Date();
  const [fecha, setFecha] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const answerFetch = async () => {
    const URL = `http://localhost:3000/Answers`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    const filtrado = await json.filter((jsonRow) => {
      console.log(id_entrante);
      return jsonRow.id_question == id_entrante && jsonRow.user == user;
    });
    setIsLoading(false);
    setAnswer(filtrado);
    if (filtrado.length > 0) {
      setFecha(filtrado[0].date);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    answerFetch();
  }, []);

  const answerInput = useRef(null);

  const answerQuestion = async () => {
    const newAnswerValue = answerInput.current.value;
    if (!newAnswerValue.trim()) {
      alert("Por favor, escribe una respuesta.");
      return;
    }
    const dateString =
      currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
    try {
      let fetchResponse;
      if (answer.length > 0) {
        fetchResponse = await fetch(
          `http://localhost:3000/Answers/${answer[0].id}`,
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
      }

      if (!fetchResponse.ok) {
        throw new Error(
          `Error al guardar la respuesta: ${fetchResponse.statusText}`
        );
      }

      setFecha(dateString);
    } catch (error) {
      console.error("Hubo un error al enviar la respuesta:", error);
    }
  };

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <>
          {answer.length > 0 ? (
            <>
              <span>{fecha}</span>
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
