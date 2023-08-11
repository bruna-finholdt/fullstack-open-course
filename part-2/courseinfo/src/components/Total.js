import React from "react";

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>total of {totalExercises} exercises</p>
    </div>
  );
};

export default Total;
