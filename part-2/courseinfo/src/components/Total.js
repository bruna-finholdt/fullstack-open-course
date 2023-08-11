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

//2.3: Course information step8
//If you haven't done so already, calculate the sum of exercises with the array method reduce.

//I had already done the exercise using the reduce method o/
