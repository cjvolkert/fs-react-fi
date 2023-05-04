import { useState } from "react";

const Header = ({ title }) => {
  console.log(title.name);
  return <h1>{title.name}</h1>;
};
const Content = ({ exercises }) => {
  return (
    <>
      <Part
        name={exercises.parts[0].name}
        exercise={exercises.parts[0].exercises}
      />
      <Part
        name={exercises.parts[1].name}
        exercise={exercises.parts[1].exercises}
      />
      <Part
        name={exercises.parts[2].name}
        exercise={exercises.parts[2].exercises}
      />
    </>
  );
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  );
};
const Total = ({ tasks }) => {
  return (
    <p>
      Number of exercises{" "}
      {tasks.parts.map((e) => e.exercises).reduce((a, b) => a + b, 0)}{" "}
    </p>
  );
};
const Display = ({ counter }) => <div>{counter}</div>;
const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>;
};

const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });

  const handleLeftClick = () => {
    setClicks({
      ...clicks,
      left: clicks.left + 1,
    });
  };

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1,
    });
  };

  // const increaseByOne = () => setCounter(counter + 1);
  // const decreaseByOne = () => setCounter(counter - 1);
  // const setToZero = () => setCounter(0);

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Display counter={clicks.left} />
      <Display counter={clicks.right} />
      <Button handleClick={handleLeftClick} text="plus2" />
      <Button handleClick={handleRightClick} text="zero2" />
      <Header title={course} />
      <Content exercises={course} />

      <Total tasks={course} />
    </div>
  );
};

export default App;
