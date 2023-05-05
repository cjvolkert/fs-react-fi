import { Course } from "./Course";

export const CourseList = ({ courses }) => {
  return <ul>{courses.map((course) => Course((course = { course })))}</ul>;
};
