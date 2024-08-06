function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div>
      <h1>Welcome to the React Quiz!</h1>
      <h3>{numOfQuestions} Questions to test your React skills</h3>
      <button className="startBtn" onClick={() => dispatch({ type: "active" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
