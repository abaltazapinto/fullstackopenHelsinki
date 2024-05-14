import { useReducer, useMemo } from "react"

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];

const initialSate = {
  selected: 0,
  votes: new Array(anecdotes.length).fill(0)
};

function reducer(state, action) {
  switch (action.type) {
    case 'VOTE':
      const newVotes = [...state.votes];
      newVotes[state.selected] += 1;
      return { ...state, votes: newVotes};
    case 'NEXT_ANECDOTE':
      return { ...state, selected: Math.floor(Math.random() * anecdotes.length) };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  const maxVotesIndex = useMemo(() => {
    const max = Math.max(...state.votes);
    return state.votes.indexOf(max);
  }, [state.votes]);

return (
  <div>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdotes[state.selected]}
      <br />
      has {state.votes[state.selected]} votes
    </div>
    <button onClick={() => dispatch({ type: 'VOTE' })}>Vote</button>
    <button onClick={() => dispatch({ type: 'NEXT_ANECDOTE' })}>Next anecdote</button>
    
    <h1>Anecdote with most votes</h1>
    {state.votes[maxVotesIndex] > 0 ? (
      <div>
        {anecdotes[maxVotesIndex]}
        <br />
        has {state.votes[maxVotesIndex]} votes
      </div>
    ) : (
      <div>No votes yet sorry.</div>
    )}
  </div>
);
}

export default App
