import React from "react";

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((totalExercises, part) => {
    return totalExercises + part.exercises;
  }, 0);

  return (
    <div>
      <p style={{fontWeight: 'bold'}}>total of {totalExercises} exercises</p>
    </div>
  );
};

export default Total;
