import React from "react";

const PersonForm = ({
  onSubmit,
  nameInputValue,
  numberInputValue,
  nameOnChange,
  numberOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameInputValue} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={numberInputValue} onChange={numberOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
