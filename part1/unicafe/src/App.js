import { useState } from "react";

function Button(props) {
  return <button onClick={props.handleClick}>{props.text}</button>;
}

function StatisticsLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function StatisticsLineWithPercent({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} %</td>
    </tr>
  );
}

function Statistics(props) {
  const { good, neutral, bad } = props;
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good + neutral + bad} />
        <StatisticsLineWithPercent
          text="positive"
          value={good / (good + neutral + bad)}
        />
      </tbody>
    </table>
  );
}

function App() {
  const [state, updateState] = useState({ good: 0, neutral: 0, bad: 0 });

  const incGood = () => {
    updateState({
      ...state,
      good: state.good + 1,
    });
  };
  const incNeutral = () => {
    updateState({
      ...state,
      neutral: state.neutral + 1,
    });
  };
  const incBad = () => {
    updateState({
      ...state,
      bad: state.bad + 1,
    });
  };

  return (
    <div>
      <h1>give feedback </h1>
      <Button text="good" handleClick={incGood} />
      <Button text="neutral" handleClick={incNeutral} />
      <Button text="bad" handleClick={incBad} />

      <h1>statistics </h1>
      <Statistics good={state.good} bad={state.bad} neutral={state.neutral} />
    </div>
  );
}

export default App;
