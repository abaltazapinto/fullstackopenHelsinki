// Course.js
import React from 'react';

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
);

const Total = ({parts }) => (
  <h3>Total of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</h3>
);


const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;