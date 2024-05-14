import { useState } from 'react'
import './App.css'

const Statistics = (props) => {
  const totalFeedback = props.good + props.neutral + props.bad;
  const average = totalFeedback > 0 ? (props.good - props.bad) / totalFeedback : 0;
  const positive = totalFeedback > 0 ? (props.good / totalFeedback) * 100 : 0;
  // Verifica se algum feedback foi dado
  if (totalFeedback === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h2>Estatísticas</h2>
      <p>Bom: {props.good}</p>
      <p>Neutro: {props.neutral}</p>
      <p>Ruim: {props.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive} %</p>
    </div>
  );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
      setGood(good + 1)
    }
    const handleNeutralClick = () => {
      setNeutral(neutral +1)
    };
    const handleBadClick = () => {
      setBad(bad + 1)
    }

  return (
    <>
     <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <hr/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>

  )
}

export default App
