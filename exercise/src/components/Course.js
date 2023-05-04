import { useState } from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

const Display = ({ counter }) => <div>{counter}</div>;
const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>;
};

export const Course = ({ course }) => {
  //   const [clicks, setClicks] = useState({ left: 0, right: 0 });

  //   const handleLeftClick = () => {
  //     setClicks({
  //       ...clicks,
  //       left: clicks.left + 1,
  //     });
  //   };

  //   const handleRightClick = () => {
  //     setClicks({
  //       ...clicks,
  //       right: clicks.right + 1,
  //     });
  //   };

  return (
    <div>
      {/* <Display counter={clicks.left} />
      <Display counter={clicks.right} />
      <Button handleClick={handleLeftClick} text="plus2" />
      <Button handleClick={handleRightClick} text="zero2" /> */}
      <Header title={course} />
      <Content exercises={course.parts} />

      <Total tasks={course} />
    </div>
  );
};
