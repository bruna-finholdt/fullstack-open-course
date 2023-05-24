import { useState } from "react";
import Button from "./components/Button";

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

  const average = (clicks.good + clicks.neutral + clicks.bad) / 3;

  const positive = clicks.good ? `${(clicks.good / all) * 100}  %` : "0 %";

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={handleGoodClick} />
      <Button text={"neutral"} handleClick={handleNeutralClick} />
      <Button text={"bad"} handleClick={handleBadClick} />
      <h1>statistics</h1>
      <p>good {clicks.good}</p>
      <p>neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  );
};

export default App;
