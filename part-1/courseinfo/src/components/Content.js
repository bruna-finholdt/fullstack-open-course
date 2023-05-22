import React from 'react'

const Content = ({Part, part1, part2, part3, exercises1, exercises2, exercises3}) => {
  
  return (
    <div>
      <Part part={part1} exerc={exercises1} />
      <Part part={part2} exerc={exercises2} />
      <Part part={part3} exerc={exercises3} />
    </div>
  );
}

export default Content
