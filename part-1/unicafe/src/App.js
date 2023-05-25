import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1,
    }
    setClicks(newClicks)
    setAll(newClicks.good + clicks.bad + clicks.neutral)
  };

  const handleNeutralClick = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1,
    };
    setClicks(newClicks);
    setAll(newClicks.neutral + clicks.bad + clicks.good);
  };

  const handleBadClick = () => {
const newClicks = {
  ...clicks,
  bad: clicks.bad + 1,
};
setClicks(newClicks);
setAll(newClicks.bad + clicks.good + clicks.neutral);
  };

  const average = Math.ceil((clicks.good + clicks.neutral + clicks.bad) / 3);

  const positive = clicks.good ? `${Math.ceil((clicks.good / all) * 100)}  %` : "0 %";

  return (
    <>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={handleGoodClick} />
      <Button text={"neutral"} handleClick={handleNeutralClick} />
      <Button text={"bad"} handleClick={handleBadClick} />
      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} all={all} average={average} positive={positive}/>
    </>
  );
};

export default App;
