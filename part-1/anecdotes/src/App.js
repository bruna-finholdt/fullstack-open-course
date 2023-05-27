import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [points, setPoints] = useState(Array.from(anecdotes, () => 0))

  const [selected, setSelected] = useState(0);

  const handleNextAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };

  const handlePressVote = () => {
    const currentAnecdotePoints = points[selected];

    setPoints((prev) => {
      const prevCopy = [...prev]
      prevCopy.splice(selected, 1, currentAnecdotePoints + 1);
      return prevCopy
    })
  };

  const mostVotedAnectode = points.reduce((acc, point, index) => {
    if(acc.points === undefined) {
      acc.points = point
      acc.anecdote = anecdotes[index]
      return acc
    }

    if(point > acc.points) {
      acc.points = point
      acc.anecdote = anecdotes[index];
      return acc
    }

    return acc
  }, {anecdote: undefined, points: undefined})

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{`Has ${points[selected]} votes`}</p>
      <button onClick={handlePressVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>
        {mostVotedAnectode.anecdote}
        <p>{`Has ${mostVotedAnectode.points} votes`}</p>
      </div>
    </div>
  );
};

export default App;
