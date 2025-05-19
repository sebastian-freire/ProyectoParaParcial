import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";

function TestQuestion({ id_entrante }) {
  const { user } = useUser();
  const [answer, setAnswer] = useState([]);
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
  };

  useEffect(() => {
    setIsLoading(true);
    answerFetch();
  }, []);

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <>
          {answer.length > 0 && <span>{answer[0].date}</span>}
          {answer.length > 0 ? (
            <textarea>{answer[0].answer}</textarea>
          ) : (
            <textarea></textarea>
          )}
        </>
      )}
    </>
  );
}

export default TestQuestion;
