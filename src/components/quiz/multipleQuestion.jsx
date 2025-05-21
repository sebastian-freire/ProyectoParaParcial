import React from "react";
import "./multipleQuestion.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";

function MultipleQuestion({ id_entrante, options }) {
  const { user } = useUser();
  const [answer, setAnswer] = useState(null);
  const currentDate = new Date();
  const [isLoading, setIsLoading] = useState(true);
  //console.log({ answer }); // FIXME

  //Se fija si el usuario tiene una respuesta para la pregunta (para sobreescribirla)
  const answerFetch = async () => {
    const URL = `http://localhost:3000/Answers?id_question=${id_entrante}&user=${user}`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Error al traer la información");
    const json = await res.json();
    setIsLoading(false);
    setAnswer(json[0]); //Guarda la respuesta si existe en el estado answer
    console.log(json[0]?.answer);
    setSelectedCheck(json[0]?.answer); //Guarda la opcion seleccionada en el radiobutton
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
      if (answer) { //Si existe una respuesta, se actualiza
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
      } else { //Si no existe una respuesta, se crea una nueva
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

  //Cada vez que se selecciona una opcion, se actualiza el estado selectedCheck. Asi el selectedCheck guarda la opcion del radiobutton
  const handleFruitChange = (event) => {
    setSelectedCheck(event.target.value); //Carga la ultima opcion seleccionada
  };

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {!isLoading && (
        <>
          <span>{answer?.date /*Fecha de la respuesta anterior si hay */}</span> 
          <ul>
            {options.map((option, index) => (
              <>
                <li>
                  <input
                    type="radio"
                    id={index}
                    name="grupoColores"
                    value={option}
                    checked={option == selectedCheck} /*Es para que se marque la última opcion seleccionada*/
                    onChange={handleFruitChange}
                  />
                  <label htmlFor={index}>{option  /*Muestra el texto de la opcion*/}</label>
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
