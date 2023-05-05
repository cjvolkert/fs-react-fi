//import { useState } from "react";
import { Part } from "./Part";

export const Content = ({ exercises }) => {
  console.log(exercises);
  return (
    <>
      {exercises.map((exercise) => (
        <Part
          key={exercise.id}
          name={exercise.name}
          exercise={exercise.exercises}
        />
      ))}
    </>
  );
};
