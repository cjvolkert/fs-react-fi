export const Total = ({ tasks }) => {
  return (
    <p>
      Number of exercises{" "}
      {tasks.parts.map((e) => e.exercises).reduce((a, b) => a + b, 0)}{" "}
    </p>
  );
};
