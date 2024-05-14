

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      title: "Fundamental of React ",
      exercises: 10,
      objectID: 0,
    },
    {
      title: "Using props to pass data ",
      exercises: 7,
      objectID: 1,
    },
    {
      title: "State of a component ",
      exercises: 14,
      objectID: 2,
    },
  ]};

return (
    <div> 
      <Header course={course} />
      <hr/>
      <Content parts={course.parts}/>
      <hr/>
      <Total parts={course.parts}/>
      </div>
  )
}

const Header = ({ course }) =>
{
  return (
    <div>
      
      <h1>{course.name} </h1>
    </div>
  )
};

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
    <Item key={part.objectID} title={part.title} exercises={part.exercises} />
    ))}
  </div>
)

const Item = ({ title, exercises }) => (
    <ul>
      <li>
        Title: {title}
      </li>
      <li>
        Exercises: {exercises}
      </li>
    </ul>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <span> Number of exercises {total}</span>
    </div>
  );
};

export default App
