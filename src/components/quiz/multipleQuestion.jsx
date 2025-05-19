import React from "react";
import "./multipleQuestion.css";

function MultipleQuestion({ options }) {
  return (
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
              />
              <label htmlFor={index}>{option}</label>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}

export default MultipleQuestion;
