import React from "react";
import "./multipleQuestion.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";

function MultipleQuestion({ id_entrante, options }) {
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
          {answer.length > 0 ? (
            <>
              <ul>
                {options.map((option, index) => (
                  <>
                    <li>
                      <input
                        type="radio"
                        id={index}
                        name="grupoColores"
                        value={option}
                        checked={option == answer[0].answer}
                      />
                      <label htmlFor={index}>{option}</label>
                    </li>
                  </>
                ))}
              </ul>
            </>
          ) : (
            <ul>
              {options.map((option, index) => (
                <>
                  <li>
                    <input
                      type="radio"
                      id={index}
                      name="grupoColores"
                      value={option}
                    />
                    <label htmlFor={index}>{option}</label>
                  </li>
                </>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default MultipleQuestion;
