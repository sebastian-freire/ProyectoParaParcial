import React from "react";

function MultipleQuestion({ options }) {
  return (
    <>
      {options.map((option, index) => (
        <>
          <input type="radio" id={index} name="grupoColores" value={option} />
          <label htmlFor={index}>{option}</label>
        </>
      ))}
    </>
  );
}

export default MultipleQuestion;
